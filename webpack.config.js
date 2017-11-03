const path = require('path');

module.exports = {
	context: __dirname,
	entry: ['./client/js/ClientApp.jsx'],
	output: {
		path: path.join(__dirname, 'public', 'js'),
		filename: 'app.js',
		publicPath: '/js/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
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
				test: /\.jsx?$/,
				loader: 'babel-loader'
			}
		]
	}
};
