const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const I18nPlugin = require('i18n-webpack-plugin');
const WebpackPwaManifestPlugin = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const enConfig = require('./i18n/en.json');

module.exports = {
  context: __dirname,
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'redux-thunk',
      'redux-form',
      'redux-orm',
      'axios',
      'react-bootstrap'
    ],
    app: './client/src/ClientApp.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, 'build')),
    new HtmlWebpackPlugin({
      title: 'Testing Hub',
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new I18nPlugin(enConfig, {
      functionName: 'localize'
    }),
    new CopyWebpackPlugin([
      {
        from: 'public/images',
        to: 'images'
      },
      {
        from: 'public/lib',
        to: 'lib'
      }
    ]),
    new ExtractTextPlugin('style.css'),
    new WebpackPwaManifestPlugin({
      name: 'Testing Hub',
      start_url: '/',
      short_name: 'Testing Hub',
      lang: 'en-US',
      description: 'An app to manage your testing',
      background_color: '#fff',
      theme_color: '#d9230f',
      ios: true,
      icons: [
        {
          src: path.resolve('public/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512, 1024],
          type: 'image/png'
        }
      ]
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      importWorkboxFrom: 'local',
      runtimeCaching: [
        {
          urlPattern: '/lib/',
          handler: 'staleWhileRevalidate'
        }
      ]
    }),
    new ProgressBarPlugin()
  ]
};
