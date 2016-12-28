import ribbon from '../data/ribbon-messages.json';

import ProbabilityBasedSelector from './ProbabilityBasedSelector';

export default () => {
  const variantSelector = new ProbabilityBasedSelector(ribbon);
  return variantSelector.select();
};
