import defaultFeaturedMessages from '../data/featured-messages.json';
import ProbabilityBasedSelector from './ProbabilityBasedSelector';

export default function getFeaturedMessage(customFeaturedMessages) {
  const variantSelector = new ProbabilityBasedSelector(
    customFeaturedMessages || defaultFeaturedMessages
  );
  return variantSelector.select();
}
