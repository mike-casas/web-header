import { merge } from 'lodash';
import { join } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import commonConfig from './webpack.common.config.babel';

const DEBUG = process.env.NODE_ENV === 'development';

const config = merge({}, commonConfig, {
  entry: [join(__dirname, '../playground/index.js')]
});

if (DEBUG) {
  config.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client');
}

// Add hot reloading React components
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.module.rules
  .filter(x => x.use === 'babel-loader')
  .forEach(x => x.include.push(join(__dirname, '../playground')));

config.plugins.push(
  new HtmlWebpackPlugin({
    template: './tools/playground/index.html',
    inject: 'body'
  })
);

export default config;
