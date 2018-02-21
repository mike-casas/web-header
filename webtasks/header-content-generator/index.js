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
  const CONTENTFUL_SPACE_ID = req.webtaskContext.secrets.CONTENTFUL_SPACE_ID;
  const CONTENTFUL_API_ACCESS_TOKEN = req.webtaskContext.secrets.CONTENTFUL_API_ACCESS_TOKEN;

  if (!contentfulClient) {
    contentfulClient = contentful.createClient({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_API_ACCESS_TOKEN
    });

    return next();
  }

  return next();
});

app.get('/', (req, res) => {
  Promise.all(getContent()).then(response => {
    const headerContent = generateHeaderContent({
      featuredMessages: response[0],
      platformSection: response[1],
      solutionsSection: response[2],
      whyAuth0Section: response[3],
      developersSection: response[4],
      lastBlogPost: response[5]
    });

    res.jsonp(headerContent);
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
      .then(response => response.data)
  ];
}

function generateHeaderContent(data) {
  const featuredMessages = data.featuredMessages.items;
  const platform = data.platformSection.items[0].fields;
  const solutions = data.solutionsSection.items[0].fields;
  const whyAuth0 = data.whyAuth0Section.items[0].fields;
  const developers = data.developersSection.items[0].fields;

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
              icon: 'singleSignOn'
              // TODO: icon: 'singleSignOn'
            }))
          }
        ],
        footerHighlight: true,
        footerLinks: [
          {
            id: _.kebabCase(platform.footerText),
            name: platform.footerText,
            href: platform.footerLink,
            icon: 'extend',
            // TODO: icon: 'extend',
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
              external: item.fields.external
              // TODO
              // customClass: 'solutionsItem-b2c',
              // alt: 'CIAM icon'
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
            // TODO: solutions.footerIcon
            icon: 'blog',
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
                  icon: 'javascript',
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
            icon: 'blog',
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
