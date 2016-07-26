var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: './examples/demo.js'
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
		contentBase: './dist/',
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		stats: 'errors-only',
		host: process.env.HOST,
		port: 12345
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
		,new webpack.NoErrorsPlugin()
		,new HtmlWebpackPlugin({
			template: './examples/index.html',
			hash: true,
			filename: 'index.html',
			inject: 'body',
			minify: {
				collapseWhitespace: false
			}
		})
	],
	stats: {
		colors: true
	},
	devtool: 'source-map'
};
