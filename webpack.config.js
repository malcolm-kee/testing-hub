const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const I18nPlugin = require('i18n-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const enConfig = require('./i18n/en.json');

module.exports = {
  context: __dirname,
  entry: ['babel-polyfill', './client/src/ClientApp.jsx'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/app.[hash].js',
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
    new ProgressBarPlugin()
  ]
};
