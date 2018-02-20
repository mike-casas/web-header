import defaultMenuItems from '../../default-menu-items/menu-items.json';

class MenuItemsInjector {
  constructor(menuItems) {
    this.menuItems = menuItems;
  }
  onMenuItemsLoad(callback) {
    callback(this.menuItems.sections);
  }
}

export default function init(window) {
  const headerMenuItemsInjector = (window.headerMenuItemsInjector = new MenuItemsInjector(
    defaultMenuItems
  ));
  const { headerMenuItemsInjectorCallback } = window;
  if (headerMenuItemsInjectorCallback) {
    headerMenuItemsInjector.onMenuItemsLoad(headerMenuItemsInjectorCallback);
  }
}
