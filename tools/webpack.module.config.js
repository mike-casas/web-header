import { merge } from 'lodash';
import commonConfig from './webpack.common.config.js';

const config = merge({}, commonConfig, {
  output: {
    filename: 'index.js',
    library: 'Auth0WebHeader',
    libraryTarget: 'umd'
  }
});

export default config;
