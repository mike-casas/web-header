import { isObject } from 'lodash';

/**
 * Generate new `src/menu-items.json`
 */
export default function generateNewMenuItemsJson([content, blog]) {
  // List of replacements for `src/menu-items.json`
  const replacements = [{
    id: 'last-blog',
    key: 'default',
    value: setValue(blog)
  }];
  // Array of replacements IDs
  const replacementsIDs = replacements.map(item => item.id);
  // Get items (objects) from `src/menu-items.json` by replacements IDs
  const orginalItems = replacementsIDs.map(id => getItem(id, content));

  // Make replaces
  makeItemsReplacements(orginalItems, replacements);

  return content;
}

function setValue(object) {
  if (!object && !isObject(object)) return null;

  return object;
}

function getItem(id, from) {
  const found = [];

  from.forEach((item) => {
    if (!item.childrens) return;
    found.push(findByID(item, 'childrens', id));

    item.childrens.forEach((childItem) => {
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
