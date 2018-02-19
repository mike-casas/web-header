import init from '../';

describe('menu-items-injector', () => {
  let window;

  beforeEach(() => {
    window = {};
  });

  describe('on init', () => {
    beforeEach(() => {
      init(window);
    });
    it('loads the menu itmes injector', () => {
      expect(window.headerMenuItemsInjector).toBeTruthy();
    });
    it('loads the menu itmes injector callback', () => {
      expect(window.headerMenuItemsInjector).toBeTruthy();
    });
  });
});
