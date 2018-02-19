import init from '../';

describe('menu-items-injector', () => {
  let window;

  beforeEach(() => {
    window = {};
  });

  describe('init', () => {
    let headerMenuItemsInjector;
    let headerMenuItemsInjectorCallback;

    describe('normal flow', () => {
      beforeEach(() => {
        init(window);
        headerMenuItemsInjector = window.headerMenuItemsInjector;
      });

      it('should load the menu itmes injector', () => {
        expect(headerMenuItemsInjector).toBeTruthy();
      });

      it('should load the menu itmes injector callback', () => {
        expect(headerMenuItemsInjector.onMenuItemsLoad).toBeTruthy();
      });

      it('should load the menu itmes', () => {
        expect(headerMenuItemsInjector.menuItems).toBeTruthy();
      });
    });

    describe('when the header bundle loads first', () => {
      beforeEach(() => {
        window.headerMenuItemsInjectorCallback = headerMenuItemsInjectorCallback = jest.fn();
        init(window);
      });

      it('should call the callback to inject items to the header', () => {
        expect(headerMenuItemsInjectorCallback).toBeCalledWith(headerMenuItemsInjector.menuItems);
      });
    });
  });

  describe('onMenuItemsLoad', () => {
    let headerMenuItemsInjector;
    let headerMenuItemsInjectorCallback;
    let callback;

    describe('normal flow', () => {
      beforeEach(() => {
        callback = jest.fn();
        init(window);
        headerMenuItemsInjector = window.headerMenuItemsInjector;
        headerMenuItemsInjector.onMenuItemsLoad(callback);
      });

      it('should load the menu itmes injector', () => {
        expect(callback).toBeCalledWith(headerMenuItemsInjector.menuItems);
      });
    });
  });
});
