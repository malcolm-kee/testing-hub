const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.config.js');

module.exports = merge(commonConfig, {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
});
