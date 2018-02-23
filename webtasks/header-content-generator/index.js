'use strict';

const express = require('express');
const axios = require('axios');
const Webtask = require('webtask-tools');
const bodyParser = require('body-parser');
const contentful = require('contentful');
const _ = require('lodash');
const basicAuth = require('basic-auth');

const app = express();
const contentfulClient = {
  delivery: null,
  preview: null
};

app.set('jsonp callback name', 'cb');
app.use(bodyParser.json());

app.post('/', initContentfulClient, validateApiKey, (req, res) => {
  const storage = req.webtaskContext.storage;

  storageSet(storage, null, { force: 1 })
    .then(() => {
      res.json({});
    })
    .catch(err => {
      log(err);
      res.status(500).json({});
    });
});

app.get('/', initContentfulClient, (req, res) => {
  const isDraft = !!req.query.draft;
  const storage = req.webtaskContext.storage;

  if (isDraft) {
    log('GET / - if (isDraft):is draft');
    return generateContent(isDraft)
      .then(headerContent => {
        log('GET / - if (isDraft):Content generated');
        res.jsonp(headerContent);
      })
      .catch(err => {
        log(err);
        res.status(500).json({});
      });
  }

  return storageGet(storage)
    .then(headerContentCache => {
      if (!headerContentCache) {
        log('Content *not* from cache');
        log('Getting content');
        return generateContent(isDraft)
          .then(headerContent => storageSet(storage, headerContent, { force: 1 }))
          .then(headerContent => {
            log('Content generated');
            res.setHeader('Cache-Control', 'public, max-age=3600'); // 1h
            res.jsonp(headerContent);
          })
          .catch(err => {
            log(err);
            res.status(500).json({});
          });
      }

      log('Content from cache');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // 1h
      return res.jsonp(headerContentCache);
    })
    .catch(err => {
      log(err);
      res.status(500).json({});
    });
});

module.exports = Webtask.fromExpress(app);

function initContentfulClient(req, res, next) {
  log('initContentfulClient:Creating Contentful client');
  const isDraft = !!req.query.draft;
  const CONTENTFUL_SPACE_ID = req.webtaskContext.secrets.CONTENTFUL_SPACE_ID;
  const CONTENTFUL_API_DELIVERY_ACCESS_TOKEN =
    req.webtaskContext.secrets.CONTENTFUL_API_DELIVERY_ACCESS_TOKEN;
  const CONTENTFUL_API_PREVIEW_ACCESS_TOKEN =
    req.webtaskContext.secrets.CONTENTFUL_API_PREVIEW_ACCESS_TOKEN;
  const CONTENTFUL_API_ACCESS_TOKEN = isDraft
    ? CONTENTFUL_API_PREVIEW_ACCESS_TOKEN
    : CONTENTFUL_API_DELIVERY_ACCESS_TOKEN;
  const typeClient = getContentfulClientType(isDraft);

  if (!contentfulClient[typeClient]) {
    const opts = {
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_API_ACCESS_TOKEN
    };
    if (isDraft) {
      log('initContentfulClient:is draft');
      opts.host = 'preview.contentful.com';
    }
    contentfulClient[typeClient] = contentful.createClient(opts);
    log('Contentful client created');

    return next();
  }

  return next();
}

function getContentfulClientType(isDraft) {
  const typeClient = isDraft ? 'preview' : 'delivery';
  return typeClient;
}

function validateApiKey(req, res, next) {
  const VALIDATE_API_KEY_ID = req.webtaskContext.secrets.VALIDATE_API_KEY_ID;
  const VALIDATE_API_KEY_SECRET = req.webtaskContext.secrets.VALIDATE_API_KEY_SECRET;
  const cred = basicAuth(req);

  if (!cred || cred.name !== VALIDATE_API_KEY_ID || cred.pass !== VALIDATE_API_KEY_SECRET) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  return next();
}

function generateContent(isDraft) {
  return Promise.all(getContent(isDraft))
    .then(downloadHeaderAssets)
    .then(generateHeaderContent);
}

function getContent(isDraft) {
  const clietType = getContentfulClientType(isDraft);
  return [
    contentfulClient[clietType].getEntries({ content_type: 'featuredMessages' }),
    contentfulClient[clietType].getEntries({ content_type: 'platform-section' }),
    contentfulClient[clietType].getEntries({ content_type: 'solutionsSection' }),
    contentfulClient[clietType].getEntries({ content_type: 'whyAuth0' }),
    contentfulClient[clietType].getEntries({ content_type: 'developersSection' }),
    axios
      .get('https://auth0-marketing.run.webtask.io/last-blog-post')
      .then(response => response.data),
    contentfulClient[clietType].getAssets({ 'fields.file.contentType': 'image/svg+xml' })
  ];
}

function downloadHeaderAssets(response) {
  log('Content getted');
  log('Downloading assets');
  const rawAssets = response[6].items;
  const stuff = {
    featuredMessages: response[0],
    platformSection: response[1],
    solutionsSection: response[2],
    whyAuth0Section: response[3],
    developersSection: response[4],
    lastBlogPost: response[5]
  };
  const downloadAssets = rawAssets.map(asset =>
    axios.get(`https:${asset.fields.file.url}`).then(assetResponse => assetResponse.data)
  );

  return Promise.all(downloadAssets).then(downloadedAssets => {
    const assets = downloadedAssets.map((asset, i) => ({
      url: rawAssets[i].fields.file.url,
      asset
    }));
    stuff.assets = assets;
    log('Assets downloaded');
    return stuff;
  });
}

function generateHeaderContent(data) {
  log('Generating content');
  const featuredMessages = data.featuredMessages.items;
  const platform = data.platformSection.items[0].fields;
  const solutions = data.solutionsSection.items[0].fields;
  const whyAuth0 = data.whyAuth0Section.items[0].fields;
  const developers = data.developersSection.items[0].fields;
  const assets = data.assets;

  return {
    featuredMessages: featuredMessages.map(items => ({
      link: items.fields.link,
      title: items.fields.title,
      description: items.fields.description,
      cta: items.fields.cta,
      iconColor: items.fields.iconColor,
      probability: items.fields.probability
    })),
    menuItems: [
      {
        name: 'Platform',
        id: 'platform',
        dropdownClass: 'platformDropdown',
        childrens: [
          {
            componentType: 'list',
            title: platform.name,
            description: platform.description,
            key: 'platform-list',
            twoColLayoutBig: true,
            items: platform.items.map(generateMenuItem)
          }
        ],
        footerHighlight: true,
        footerLinks: [
          {
            id: _.kebabCase(platform.footerText),
            name: platform.footerText,
            href: platform.footerLink,
            icon: inlineAsset(assets, platform.footerIcon),
            external: true
          }
        ]
      },
      {
        name: 'Solutions',
        id: 'solutions',
        dropdownClass: 'solutionsDropdown',
        twoBlockLayout: true,
        childrens: [
          {
            componentType: 'list',
            title: 'Use Cases',
            key: 'use-cases-list',
            stackedList: true,
            items: solutions.useCases.map(generateMenuItem)
          },
          {
            componentType: 'list',
            title: 'Use Auth0 in',
            key: 'solutions-list',
            highlight: true,
            subItems: [
              {
                titleList: 'INDUSTRIES',
                items: solutions.useAuth0InIndustries.map(generateMenuItem)
              },
              {
                titleList: 'INITIATIVES',
                items: solutions.useAuth0InInitiatives.map(generateMenuItem)
              }
            ]
          }
        ],
        footerLinks: [
          {
            id: 'read-case-studies',
            name: 'Read our Case Studies',
            href: solutions.footerLink,
            icon: inlineAsset(assets, solutions.footerIcon),
            external: true
          }
        ]
      },
      {
        name: 'Why Auth0',
        id: 'why-auth0',
        dropdownClass: 'whyDropdown',
        twoBlockLayout: true,
        childrens: [
          {
            componentType: 'list',
            title: 'Company',
            key: 'company-list',
            items: whyAuth0.companyItems.map(generateMenuItem)
          },
          {
            componentType: 'list',
            title: 'Resources',
            key: 'resources-list',
            highlight: true,
            titleHref: 'https://auth0.com/resources',
            external: true,
            items: whyAuth0.resourcesItems.map(generateMenuItem)
          }
        ]
      },
      {
        name: 'Developers',
        id: 'developers',
        dropdownClass: 'developersDropdown',
        twoBlockLayout: true,
        childrens: [
          {
            componentType: 'list',
            title: 'Documentation',
            key: 'documentation-list',
            titleHref: developers.documentationLink,
            external: true,
            subItems: [
              {
                titleList: 'GET STARTED',
                items: developers.documentationGetStarted.map(generateMenuItem)
              },
              {
                titleList: 'SECTIONS',
                items: developers.documentationSectionsItems.map(generateMenuItem)
              }
            ]
          },
          {
            componentType: 'list',
            title: 'Resources',
            key: 'resources-list',
            highlight: true,
            items: developers.resourcesItems.map(generateMenuItem)
          }
        ],
        footerLinks: [
          {
            id: 'latest-blog',
            name: `<b>Latest from Auth0 Blog:</b> ${data.lastBlogPost.title}`,
            icon: inlineAsset(assets, developers.footerIcon),
            external: true,
            href: data.lastBlogPost.link
          }
        ]
      },
      {
        name: 'Pricing',
        id: 'pricing',
        href: 'https://auth0.com/pricing'
      }
    ]
  };
}

function inlineAsset(assets, asset) {
  const assetFound = assets.find(item => item.url === asset.fields.file.url);
  return assetFound ? assetFound.asset : undefined;
}

function generateMenuItem(item) {
  const menuItem = {
    name: item.fields.name,
    id: _.kebabCase(item.fields.name),
    href: item.fields.link,
    external: item.fields.external
  };

  if (item.iconColor && item.iconText) {
    menuItem.iconColor = item.fields.textIconColor;
    menuItem.iconText = item.fields.textIconLabel;
  }

  if (item.icon) {
    menuItem.icon = item.fields.icon;
  }

  return menuItem;
}

function log(msg) {
  console.log(msg);
}

/**
 * Webtask Storage API write data promisified
 *
 * @param {object} storage - Webtask Storage API
 * @param {object} data - Data to save on Webtask Storage
 * @param {object} data - Options for write on Webtask Storage
 */
function storageSet(storage, data, options) {
  return new Promise((resolve, reject) => {
    storage.set(data, options, error => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
}

/**
 * Webtask Storage API read data promisified
 *
 * @param {object} storage - Webtask Storage API
 * @returns {object} Data from Webtask Storage
 */
function storageGet(storage) {
  return new Promise((resolve, reject) => {
    storage.get((error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
}
