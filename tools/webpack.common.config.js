import path from 'path';
import webpack from 'webpack';
import poststylus from 'poststylus';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const DEBUG = process.env.NODE_ENV !== 'production';

const config = {
  entry: [
    './src'
  ],

  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: ''
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [path.join(__dirname, '../src')]
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract('style-loader',
        `css-loader?${JSON.stringify({
          sourceMap: DEBUG,
          minimize: !DEBUG,
          modules: true,
          localIdentName: DEBUG ? '[path][name]--[local]--[hash:base64:5]' : '[hash:base64:4]'
        })}!stylus-loader`)
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url-loader',
      query: {
        name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
        limit: 10000
      }
    }]
  },

  plugins: [
    new ExtractTextPlugin('index.css'),
    // Assign the module and chunk ids by occurrence count
    // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    new webpack.optimize.OccurenceOrderPlugin(true),

    ...DEBUG ? [] : [
      // Search for equal or similar files and deduplicate them in the output
      // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      new webpack.optimize.DedupePlugin(),

      // Minimize all JavaScript output of chunks
      // https://github.com/mishoo/UglifyJS2#compressor-options
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true
        }
      }),

      // A plugin for a more aggressive chunk merging strategy
      // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
      new webpack.optimize.AggressiveMergingPlugin()
    ],
    new webpack.NoErrorsPlugin()
  ],

  stylus: {
    use: [
      poststylus(['autoprefixer'])
    ]
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    timings: true
  },

  devtool: DEBUG ? 'inline-source-map' : null
};

module.exports = config;
