const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const prodconfig = require('./webpack.config.js');

module.exports = merge.strategy({
  entry: 'prepend'
})(prodconfig, {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ],
  devtool: 'eval',
  devServer: {
    hot: true,
    port: 3000,
    contentBase: path.resolve('build'),
    publicPath: '/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    proxy: {
      '/api': {
        target: 'https://vast-journey-10806.herokuapp.com',
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()]
});
