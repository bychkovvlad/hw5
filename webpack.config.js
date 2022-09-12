const path = require('path');
const HtmlWebpackPlugin= require('html-webpack-plugin')
const ReactRefreshWebpackPlugn = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');  

const isProd = process.env.NODE_ENV === 'production';
const getSettingsForStyles = (withModules = false) => {
    return [MiniCssExtractPlugin.loader,
        !withModules ? 'css-loader' : {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]'
            }
        },
    }, {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: ['autoprefixer']
            }
        }
    }, 'sass-loader']
}


module.exports = {
    entry: path.join(srcPath, 'index.tsx'),
    target: !isProd ? 'web' : 'browserslist',
    devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html')
        }),
        !isProd && new ReactRefreshWebpackPlugn(),
        new MiniCssExtractPlugin(
            {
                filename: '[name]-[hash].css'
            }
        ),
        new TsCheckerPlugin()
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true)
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles()
            }, 
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            components: path.join(srcPath, 'components')
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: 3000,
        hot: true,
        inline: true
    }
}