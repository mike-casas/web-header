import menuItems from '../../default-menu-items/menu-items.json';

class MenuItemsInjector {
  onMenuItemsLoad(callback) {
    callback(menuItems);
  }
}

export default function init(window) {
  const headerMenuItemsInjector = new MenuItemsInjector();
  const { headerMenuItemsInjectorCallback } = window;
  if (headerMenuItemsInjectorCallback) {
    headerMenuItemsInjector.onMenuItemsLoad(headerMenuItemsInjectorCallback);
  }

  window.headerMenuItemsInjector = headerMenuItemsInjector;
}
