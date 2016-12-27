import './polyfills';

export default class ProbabilityBasedSelector {
  constructor(variants) {
    this.variants = variants;
  }

  select = () => {
    const random = this.getRandom();
    const intervals = this.getIntervals();

    const winner = intervals.find(interval =>
      random >= interval.from && random < interval.to
    );

    return winner ? winner.variant : null;
  }

  // NOTE: This assumes that Math.random is good enough for the purpose
  // of this library
  getRandom = () => Math.random();

  getTotal = () =>
    this.variants.reduce((soFar, variant) =>
      soFar + variant.probability
    , 0);

  getIntervals = () => {
    let lastTo = 0;
    const total = this.getTotal();
    const thereIsOne = this.variants.find(variant => variant.probability === 1);

    return this.variants
      .map((variant) => {
        const probability = variant.probability;
        let from = lastTo;
        let to = (probability / total) + from;
        lastTo = to;

        if (thereIsOne && probability === 1) {
          from = 0;
          to = 1;
        }

        if (thereIsOne && probability !== 1) {
          from = 0;
          to = 0;
        }

        return { variant, from, to };
      });
  }
}
