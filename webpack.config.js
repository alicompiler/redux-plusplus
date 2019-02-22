const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/example.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                },
            },
            exclude: '/node_modules/'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Redux++',
            template: 'public/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};