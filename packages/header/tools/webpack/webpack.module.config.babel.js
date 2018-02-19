import { merge } from 'lodash';
import nodeExternals from 'webpack-node-externals';
import commonConfig from './webpack.common.config.babel';

const CDN = !!process.env.CDN;

const externals = CDN
  ? {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  : [nodeExternals({ modulesFromFile: true })];

const config = merge({}, commonConfig, {
  externals
});

export default config;
