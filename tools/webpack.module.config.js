import { merge } from 'lodash';
import commonConfig from './webpack.common.config';

const config = merge({}, commonConfig, {
  output: {
    filename: 'web-header.js',
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
