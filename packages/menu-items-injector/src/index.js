import defaultContent from '../../default-content/content.json';

class ContentInjector {
  constructor(content) {
    this.content = content;
  }
  onContentLoad(callback) {
    callback(this.content);
  }
}

export default function init({ draft = false, remoteEndpoint = '' }, window, document) {
  if (remoteEndpoint) {
    return injectContentFromRemoteEndpoint({ draft, remoteEndpoint }, window, document);
  }

  return injectContent(defaultContent);
}

function injectContentFromRemoteEndpoint({ draft, remoteEndpoint }, window, document) {
  const onError = () => injectContent(defaultContent);
  window.headerContentInjectorJSONPCallback = content => injectContent(content);

  loadScript(
    `${remoteEndpoint}?cb=headerContentInjectorJSONPCallback&draft=${draft}`,
    onError,
    document
  );
}

function loadScript(src, onError, document) {
  const script = document.createElement('script');
  const first = document.getElementsByTagName('script')[0];

  script.async = true;
  script.src = src;
  script.type = 'text/javascript';

  first.parentNode.insertBefore(script, first);

  script.onerror = () => onError();
}

function injectContent(content) {
  const headerContentInjector = (window.headerContentInjector = new ContentInjector(content));
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
