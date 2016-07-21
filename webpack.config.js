
var path = require('path');
var webpack = require('webpack');

var DEBUG = true;

module.exports = {
    entry: [
        'babel-polyfill',
        './examples/demo.js'
    ],
    output: {
        path: __dirname,
        filename: './dist/bundle.js'
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
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
