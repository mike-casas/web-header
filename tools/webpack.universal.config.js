import { merge } from 'lodash';
import commonConfig from './webpack.common.config.js';

const DEBUG = process.env.NODE_ENV !== 'production';

const config = merge({}, commonConfig, {
  output: {
    filename: 'index.js',
    library: 'Auth0WebHeader',
    libraryTarget: 'umd'
  }
});

config.module.loaders
  .filter(x => x.loader === config.stylLoader)
  .forEach(x => (x.loader = `isomorphic-style-loader!${x.loader}`));

export default config;
