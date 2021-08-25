const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    entry: {
        'index': PATHS.source + '/pages/index/index.js',
        'blog': PATHS.source + '/pages/blog/blog.js',

    },
    output: {
        path: PATHS.build,
        filename: './js/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index'],
            template: PATHS.source + '/pages/index/index.pug', 
        }),
        new HtmlWebpackPlugin({
            filename: 'blog.html',
            chunks: ['blog'],
            template: PATHS.source + '/pages/blog/blog.pug', 
        }),
        new ExtractTextPlugin({filename:'./css/[name].css'}),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: {removeAll: true}}
        }),
        new UglifyJSPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.(s*)css$/,
                use: [
                    ExtractTextPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
}