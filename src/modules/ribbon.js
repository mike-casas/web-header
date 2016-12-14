import ribbon from '../data/ribbon-messages.json';

import ProbabilityBasedSelector from './ProbabilityBasedSelector';

const variantSelector = new ProbabilityBasedSelector(ribbon);

export default variantSelector.select();
