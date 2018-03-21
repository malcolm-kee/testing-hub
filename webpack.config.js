const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const I18nPlugin = require('i18n-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const enConfig = require('./i18n/en.json');

module.exports = {
  context: __dirname,
  entry: ['babel-polyfill', './client/src/ClientApp.jsx'],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'app.[hash].js',
    publicPath: '/js/'
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
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, 'public', 'js')),
    new I18nPlugin(enConfig, {
      functionName: 'localize'
    }),
    new ProgressBarPlugin()
  ]
};
