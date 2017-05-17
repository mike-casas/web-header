import path from 'path';
import webpack from 'webpack';
import poststylus from 'poststylus';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

if (!process.env.NODE_ENV) {
  throw new Error('Define a NODE_ENV env var, it can be development or production.');
}

const DEBUG = process.env.NODE_ENV === 'development';
const CDN = !!process.env.CDN;

const config = {
  entry: ['./src'],

  output: {
    path: CDN ? path.join(__dirname, '../../cdn') : path.join(__dirname, '../../build'),
    publicPath: '',
    filename: 'web-header.js',
    library: 'Auth0WebHeader',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [path.join(__dirname, '../../src')]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
          limit: 10000
        }
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: DEBUG,
                minimize: !DEBUG,
                modules: true,
                localIdentName: DEBUG ? '[path][name]--[local]--[hash:base64:5]' : '[hash:base64:4]'
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                'include css': true,
                paths: [path.resolve(__dirname, '../../node_modules')],
                use: [poststylus(['autoprefixer'])],
                sourceMap: DEBUG
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: DEBUG,
      minimize: !DEBUG
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

    ...(DEBUG
      ? []
      : [
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
          },
          sourceMap: true
        })
      ]
    ),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  cache: DEBUG,

  stats: {
    colors: true
  },

  devtool: DEBUG ? 'cheap-module-source-map' : 'source-map'
};

export default config;
