import path from 'path';
import webpack from 'webpack';
import poststylus from 'poststylus';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

if (!process.env.NODE_ENV) {
  throw new Error('Define a NODE_ENV env var, it can be development or production.');
}

const DEBUG = process.env.NODE_ENV === 'development';

const config = {
  entry: [
    './src'
  ],

  output: {
    path: path.join(__dirname, '../../build'),
    publicPath: '',
    filename: 'web-header.js',
    library: 'Auth0WebHeader',
    libraryTarget: 'umd'

  },

  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      include: [path.join(__dirname, '../../src')]
    }, {
      test: /\.json$/,
      use: 'json-loader'
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [{
          loader: 'css-loader',
          query: {
            sourceMap: DEBUG,
            minimize: !DEBUG,
            modules: true,
            localIdentName: DEBUG ? '[path][name]--[local]--[hash:base64:5]' : '[hash:base64:4]'
          }
        }, {
          loader: 'stylus-loader',
          query: {
            'include css': true,
            paths: [path.resolve(__dirname, '../../node_modules')]
          }
        }]
      })
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      use: 'url-loader',
      query: {
        name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
        limit: 10000
      }
    }]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: DEBUG,
      minimize: true,
      options: {
        context: __dirname,
        stylus: {
          use: [
            poststylus(['autoprefixer'])
          ]
        }
      }
    }),
    // Name of the CSS bundle
    // https://github.com/webpack/extract-text-webpack-plugin/
    new ExtractTextPlugin({
      filename: 'web-header.css',
      disable: DEBUG
    }),
    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"'
    }),

    ...DEBUG ? [] : [
      // Minimize all JavaScript output of chunks
      // https://github.com/mishoo/UglifyJS2#compressor-options
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // React doesn't support IE8
          warnings: false
        },
        mangle: {
          screw_ie8: true
        },
        output: {
          comments: false,
          screw_ie8: true
        }
      }),

      // A plugin for a more aggressive chunk merging strategy
      // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
      new webpack.optimize.AggressiveMergingPlugin()
    ],
    new webpack.NoErrorsPlugin()
  ],

  cache: DEBUG,

  stats: {
    colors: true
  },

  devtool: DEBUG ? 'inline-source-map' : false
};

export default config;
