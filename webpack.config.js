var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		//demo: './examples/demo.js',
		index: './src/index.jsx'
	},
	output: {
		path: './dist/',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					plugins: ['transform-runtime'],
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.less$/,
				include: /src/,
				loaders: [
					'style',
					'css?sourceMap',
					'less'
				]
			}
		]
	},

	devServer: {
		contentBase: './examples/',
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		stats: 'errors-only',
		host: process.env.HOST,
		port: 12345
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	stats: {
		colors: true
	},
	devtool: 'source-map'
};
