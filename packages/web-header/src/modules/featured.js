import menuItems from '../data/menu-items.json';
import ProbabilityBasedSelector from './ProbabilityBasedSelector';

export default function getFeaturedMessage(customFeaturedMessages) {
  const variantSelector = new ProbabilityBasedSelector(
    customFeaturedMessages || menuItems.featuredMessages
  );
  return variantSelector.select();
}
