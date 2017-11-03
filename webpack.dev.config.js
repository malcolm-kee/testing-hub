const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const prodconfig = require('./webpack.config.js');

module.exports = merge.strategy({
	entry: 'prepend'
})(prodconfig, {
	entry: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server'],
	devtool: 'source-map',
	devServer: {
		hot: true,
		port: 3000,
		contentBase: path.resolve('public'),
		publicPath: '/js/',
		proxy: {
			'/api': 'http://localhost:5000'
		},
		historyApiFallback: true
	},
	plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()]
});
