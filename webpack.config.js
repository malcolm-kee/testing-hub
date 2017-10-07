const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: __dirname,
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'./src/js/ClientApp.jsx'
	],
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'public', 'js'),
		filename: 'app.js',
		publicPath: '/js/'
	},
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
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	stats: {
		colors: true,
		reasons: true,
		chunks: false
	},
	plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()],
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			}
		]
	}
};
