import { merge } from 'lodash';
import commonConfig from './webpack.common.config.js';

const config = merge({}, commonConfig, {
  output: {
    filename: 'index.js',
    library: 'Auth0WebHeader',
    libraryTarget: 'umd'
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }
});

export default config;
