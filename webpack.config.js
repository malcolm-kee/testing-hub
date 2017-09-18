const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: __dirname,
	entry: './src/js/App_FE.js',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'public', 'js'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	stats: {
		colors: true,
		reasons: true,
		chunks: false
	},
	plugins: [
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery'
		})
	]
};
