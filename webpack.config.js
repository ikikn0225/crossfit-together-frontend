const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
    mode: prod ? 'production' : 'development',
    devtool: prod ? 'hidden-source-map' : 'eval',

    entry: './src/index.tsx',

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
    },

    module: {
        rules: [
        {
            test: /\.tsx?$/,
            use: ['babel-loader', 'ts-loader'],
        },
        { 
            test: /\.(png|jpg)$/, 
            loader: 'file-loader',
            options: {
                publicPath:'./dist/',
                name: '[name].[ext]?[hash]',
            }
        }
        ],
    },

    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
    },

    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],

    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 3000,
        hot: true,
        publicPath: '/',
    },
};