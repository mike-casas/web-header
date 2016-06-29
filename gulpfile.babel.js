import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import commonConfig from './tools/webpack.common.config';
import moduleConfig from './tools/webpack.module.config';
import playgroundConfig from './tools/webpack.playground.config';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import { isObject } from 'lodash';
import superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const menuItemsJson = path.join(__dirname, 'src', 'menu-items.json');
const request = superagentPromise(superagent, Promise);
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

/**
 * Update menu-items.json
 */
gulp.task('data', () =>
  Promise.all([
    readFile(menuItemsJson),
    request.get('https://auth0.com/blog/last.json'),
    request.get('https://auth0.com/learn/api/header_featured.json')
  ])
    .then(parseData)
    .then(generateNewMenuItemsJson)
    .then(saveNewMenuItemsJson)
    .catch(err => {
      throw err;
    })
);

/**
 * Parse data
 */
function parseData([originalContent, blogResponse, learnResponse]) {
  // Parse JSON of `src/menu-items.json` to js object
  const content = JSON.parse(originalContent.toString());
  // Parse results from endpoints
  const [blog, learn] = [blogResponse.body, learnResponse.body];

  return [content, blog, learn];
}

/**
 * Generate new `src/menu-items.json`
 */
function generateNewMenuItemsJson([content, blog, learn]) {
  // List of replacements for `src/menu-items.json`
  const replacements = [{
    id: 'last-blog',
    key: 'default',
    value: setValue(blog)
  }, {
    id: 'learn-case-studies',
    key: 'highlight',
    value: setValue(learn['case-studies'])
  }, {
    id: 'learn-use-cases',
    key: 'highlight',
    value: setValue(learn['use-cases'])
  }, {
    id: 'learn-industries',
    key: 'highlight',
    value: setValue(learn.industries)
  }, {
    id: 'learn-concepts',
    key: 'highlight',
    value: setValue(learn.concepts)
  }, {
    id: 'learn-frameworks',
    key: 'highlight',
    value: setValue(learn.frameworks)
  }, {
    id: 'learn-growth',
    key: 'highlight',
    value: setValue(learn.growth)
  }];
  // Array of replacements IDs
  const replacementsIDs = replacements.map(item => item.id);
  // Get items (objects) from `src/menu-items.json` by replacements IDs
  const orginalItems = replacementsIDs.map(id => getItem(id, content));

  // Make replaces
  makeItemsReplacements(orginalItems, replacements);

  // Convert to JSON (prettify)
  return JSON.stringify(content, null, 2);
}

function setValue(object) {
  if (!object && !isObject(object)) return null;

  return object;
}

function getItem(id, from) {
  const found = [];

  from.forEach(item => {
    if (!item.childrens) return;
    found.push(findByID(item, 'childrens', id));

    item.childrens.forEach(childItem => {
      if (!childItem.items) return;
      found.push(findByID(childItem, 'items', id));
    });
  });

  return found.filter(item => item !== false)[0];
}

function findByID(item, key, id) {
  const find = item[key].filter(child => child.id === id);

  return find.length ? find[0] : false;
}

function makeItemsReplacements(items, replacements) {
  /* eslint-disable no-param-reassign, consistent-return */
  items.forEach((item, index) => {
    const replaceSource = replacements[index];
    if (!item) return;
    if (replaceSource.value === null) return delete item[replaceSource.key];

    item[replaceSource.key] = Object.assign({}, item[replaceSource.key], replaceSource.value);
  });
}

/**
 * Save new `src/menu-items.json`
 */
function saveNewMenuItemsJson(content) {
  return writeFile(menuItemsJson, content);
}


/**
 * Develop with BrowserSync and HR
 */
gulp.task('dev', () => {
  const bundler = webpack(playgroundConfig);
  const bs = browserSync.create();

  bs.init({
    server: {
      baseDir: 'dist',

      middleware: [
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: playgroundConfig.output.publicPath,

          // pretty colored output
          stats: { colors: true }

          // for other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler)
      ]
    }
  });
});


/**
 * Create bundles: universal bundle and browser-only bundle
 */
gulp.task('build', () =>
  Promise.all([
    bundle(moduleConfig)
  ])
    .then(stats => {
      stats.forEach(stat => {
        console.log(stat.toString(commonConfig.stats));
      });
    })
    .catch(err => {
      throw err;
    })
);

function bundle(config) {
  return new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      return resolve(stats);
    });
  });
}
