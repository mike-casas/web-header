'use strict';

const express = require('express');
const axios = require('axios');
const Webtask = require('webtask-tools');
const bodyParser = require('body-parser');
const contentful = require('contentful');
const _ = require('lodash');

const app = express();
let contentfulClient = null;

app.set('jsonp callback name', 'cb');
app.use(bodyParser.json());
app.use((req, res, next) => {
  log('Creating Contentful client');
  const CONTENTFUL_SPACE_ID = req.webtaskContext.secrets.CONTENTFUL_SPACE_ID;
  const CONTENTFUL_API_ACCESS_TOKEN = req.webtaskContext.secrets.CONTENTFUL_API_ACCESS_TOKEN;

  if (!contentfulClient) {
    contentfulClient = contentful.createClient({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_API_ACCESS_TOKEN
    });
    log('Contentful client created');

    return next();
  }

  return next();
});

app.get('/', (req, res) => {
  const storage = req.webtaskContext.storage;

  storageGet(storage)
    .then(headerContentCache => {
      if (!headerContentCache) {
        log('Content *not* from cache');
        log('Getting content');
        return Promise.all(getContent())
          .then(downloadHeaderAssets)
          .then(generateHeaderContent)
          .then(headerContent => storageSet(storage, headerContent, { force: 1 }))
          .then(headerContent => {
            log('Content generated');
            res.jsonp(headerContent);
          })
          .catch(err => {
            log(err);
            res.status(500).json({});
          });
      }
      log('Content from cache');

      return res.jsonp(headerContentCache);
    })
    .catch(err => {
      log(err);
      res.status(500).json({});
    });
});

module.exports = Webtask.fromExpress(app);

function getContent() {
  return [
    contentfulClient.getEntries({ content_type: 'featuredMessages' }),
    contentfulClient.getEntries({ content_type: 'platform-section' }),
    contentfulClient.getEntries({ content_type: 'solutionsSection' }),
    contentfulClient.getEntries({ content_type: 'whyAuth0' }),
    contentfulClient.getEntries({ content_type: 'developersSection' }),
    axios
      .get('https://auth0-marketing.run.webtask.io/last-blog-post')
      .then(response => response.data),
    contentfulClient.getAssets()
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
  const headerAssets = rawAssets.filter(asset => asset.fields.file.contentType === 'image/svg+xml');
  const downloadAssets = headerAssets.map(asset =>
    axios.get(`https:${asset.fields.file.url}`).then(assetResponse => assetResponse.data)
  );

  return Promise.all(downloadAssets).then(downloadedAssets => {
    const assets = downloadedAssets.map((asset, i) => ({
      url: headerAssets[i].fields.file.url,
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
            items: platform.items.map(item => ({
              name: item.fields.name,
              description: item.fields.description,
              id: _.kebabCase(item.fields.name),
              href: item.fields.link,
              external: item.fields.external,
              icon: inlineAsset(assets, item.fields.icon)
            }))
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
            items: solutions.useCases.map(item => ({
              name: item.fields.name,
              id: _.kebabCase(item.fields.name),
              href: item.fields.link,
              external: item.fields.external,
              iconColor: item.fields.textIconColor,
              iconText: item.fields.textIconLabel
            }))
          },
          {
            componentType: 'list',
            title: 'Use Auth0 in',
            key: 'solutions-list',
            highlight: true,
            subItems: [
              {
                titleList: 'INDUSTRIES',
                items: solutions.useAuth0InIndustries.map(item => ({
                  name: item.fields.name,
                  id: _.kebabCase(item.fields.name),
                  href: item.fields.link,
                  external: item.fields.external
                }))
              },
              {
                titleList: 'INITIATIVES',
                items: solutions.useAuth0InInitiatives.map(item => ({
                  name: item.fields.name,
                  id: _.kebabCase(item.fields.name),
                  href: item.fields.link,
                  external: item.fields.external
                }))
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
            items: whyAuth0.companyItems.map(item => ({
              name: item.fields.name,
              id: _.kebabCase(item.fields.name),
              href: item.fields.link,
              external: item.fields.external
            }))
          },
          {
            componentType: 'list',
            title: 'Resources',
            key: 'resources-list',
            highlight: true,
            titleHref: 'https://auth0.com/resources',
            external: true,
            items: whyAuth0.resourcesItems.map(item => ({
              name: item.fields.name,
              id: _.kebabCase(item.fields.name),
              href: item.fields.link,
              external: item.fields.external
            }))
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
                items: developers.documentationGetStarted.map(item => ({
                  name: item.fields.name,
                  id: _.kebabCase(item.fields.name),
                  href: item.fields.link,
                  icon: inlineAsset(assets, item.fields.icon),
                  external: item.fields.external
                }))
              },
              {
                titleList: 'SECTIONS',
                items: developers.documentationSectionsItems.map(item => ({
                  name: item.fields.name,
                  id: _.kebabCase(item.fields.name),
                  href: item.fields.link,
                  external: item.fields.external
                }))
              }
            ]
          },
          {
            componentType: 'list',
            title: 'Resources',
            key: 'resources-list',
            highlight: true,
            items: developers.resourcesItems.map(item => ({
              name: item.fields.name,
              id: _.kebabCase(item.fields.name),
              href: item.fields.link,
              external: item.fields.external
            }))
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
