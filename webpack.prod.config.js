const webpack = require('webpack');
const merge = require('webpack-merge');
const WorkboxPlugin = require('workbox-webpack-plugin');

const commonConfig = require('./webpack.config.js');

module.exports = merge(commonConfig, {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      importWorkboxFrom: 'local',
      exclude: [/\.map$/, /^manifest.*\.js(?:on)?$/, /\.js.map$/, /\.css.map/],
      runtimeCaching: [
        {
          urlPattern: '/lib/',
          handler: 'staleWhileRevalidate'
        }
      ]
    })
  ]
});
