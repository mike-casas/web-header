import defaultFeaturedMessages from '../data/featured-messages.json';
import ProbabilityBasedSelector from './ProbabilityBasedSelector';
import { isNode } from './utils';

export default function getFeaturedVariant(url, customFeaturedMessages) {
  const featuredMessages = customFeaturedMessages || defaultFeaturedMessages;
  const filteredMessages = filterFeaturedMessages(featuredMessages, url);
  const variantSelector = new ProbabilityBasedSelector(filteredMessages);
  return variantSelector.select();
}

function filterFeaturedMessages(featuredMessages, url = defaultUrl()) {
  const filteredMessages = featuredMessages.filter((featuredMessage) => {
    if (!featuredMessage.include) {
      return true;
    }

    const regex = new RegExp(featuredMessage.include);
    const include = regex.test(url);
    return include;
  });

  return filteredMessages;
}

function defaultUrl() {
  if (isNode) {
    return null;
  }
  /* eslint-env browser */

  return window.location.href;
}
