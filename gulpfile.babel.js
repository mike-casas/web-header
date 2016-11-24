import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import commonConfig from './tools/webpack.common.config';
import moduleConfig from './tools/webpack.module.config';
import playgroundConfig from './tools/webpack.playground.config';

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
