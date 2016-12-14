import { merge } from 'lodash';
import commonConfig from './webpack.common.config.babel';

const config = merge({}, commonConfig, {
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
