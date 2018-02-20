import init from '../';

describe('menu-items-injector', () => {
  let window;

  beforeEach(() => {
    window = {};
  });

  describe('init', () => {
    let headerContentInjector;
    let headerContentInjectorCallback;

    describe('normal flow', () => {
      beforeEach(() => {
        init(window);
        headerContentInjector = window.headerContentInjector;
      });

      it('should load the content injector', () => {
        expect(headerContentInjector).toBeTruthy();
      });

      it('should load the content injector callback', () => {
        expect(headerContentInjector.onContentLoad).toBeTruthy();
      });

      it('should load the content', () => {
        expect(headerContentInjector.content).toBeTruthy();
      });
    });

    describe('when the header bundle loads first', () => {
      beforeEach(() => {
        window.headerContentInjectorCallback = headerContentInjectorCallback = jest.fn();
        init(window);
      });

      it('should call the callback to inject items to the header', () => {
        expect(headerContentInjectorCallback).toBeCalledWith(headerContentInjector.content);
      });
    });
  });

  describe('onContentLoad', () => {
    let headerContentInjector;
    let headerContentInjectorCallback;
    let callback;

    describe('normal flow', () => {
      beforeEach(() => {
        callback = jest.fn();
        init(window);
        headerContentInjector = window.headerContentInjector;
        headerContentInjector.onContentLoad(callback);
      });

      it('should load the content injector', () => {
        expect(callback).toBeCalledWith(headerContentInjector.content);
      });
    });
  });
});
