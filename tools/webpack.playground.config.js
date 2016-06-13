import { merge } from 'lodash';
import commonConfig from './webpack.common.config.js';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import path from 'path';
import CarteBlanche from 'carte-blanche';

const DEBUG = process.env.NODE_ENV !== 'production';

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

config.module.loaders
  .filter(x => x.loader === config.stylLoader)
  .forEach(x => (x.loader = `style-loader!${x.loader}`));

config.plugins.push(
  new HtmlWebpackPlugin({
    title: 'Auth0 Web Header Component',
    template: './tools/playground-template.ejs',
    inject: 'body'
  })
);

config.plugins.push(
  new CarteBlanche({
    componentRoot: './src',
    dest: 'variations'
  })
);

export default config;
