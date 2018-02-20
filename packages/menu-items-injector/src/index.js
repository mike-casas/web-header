import defaultContent from '../../default-content/content.json';

class ContentInjector {
  constructor(content) {
    this.content = content;
  }
  onContentLoad(callback) {
    callback(this.content);
  }
}

export default function init(window) {
  const headerContentInjector = (window.headerContentInjector = new ContentInjector(
    defaultContent
  ));
  const { headerContentInjectorCallback } = window;
  if (headerContentInjectorCallback && !Array.isArray(headerContentInjectorCallback)) {
    headerContentInjector.onContentLoad(headerContentInjectorCallback);
  }
  if (headerContentInjectorCallback && Array.isArray(headerContentInjectorCallback)) {
    headerContentInjectorCallback.forEach(callback => {
      headerContentInjector.onContentLoad(callback);
    });
  }
}
