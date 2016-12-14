import { merge } from 'lodash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import path from 'path';
import commonConfig from './webpack.common.config';

const config = merge({}, commonConfig, {
  entry: [
    // necessary for hot reloading with IE:
    'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    'webpack-hot-middleware/client',
    // playground code:
    './tools/playground'
  ],

  devtool: 'eval-source-map'
});

// Add hot reloading React components
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.module.loaders
  .filter(x => Array.isArray(x.loaders) && x.loaders[0] === 'babel')
  .forEach(x => (x.include.push(path.join(__dirname))));

config.plugins.push(
  new HtmlWebpackPlugin({
    title: 'Auth0 Web Header Component',
    template: './tools/playground-template.ejs',
    inject: 'body'
  })
);

export default config;
