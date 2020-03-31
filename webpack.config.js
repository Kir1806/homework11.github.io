const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'; // создаем переменную для development-сборки

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js' // прописываем хеш в имени файла
        },
module: {
    rules: [{ // тут описываются правила
                test: /\.js$/, // регулярное выражение, которое ищет все js файлы
                use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
                exclude: /node_modules/ // исключает папку node_modules
            },
            {
                test: /\.css$/, // применять это правило только к CSS-файлам
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // к этим файлам нужно применить пакеты, которые мы уже установили
            },
// пример настройки плагина image-webpack-loader
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    'file-loader?name=../images/[name].[ext]', // указали папку, куда складывать изображения
                    {
                    loader: 'image-webpack-loader',
                    options: {}
                    },
                    ]
            },
// заггрузка шрифтов
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
            }           
        ]    
    },
    plugins: [ 
        new MiniCssExtractPlugin({filename: 'index.css'}),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
    }),
        new HtmlWebpackPlugin({
            // Означает, что:
            inject: false, // стили НЕ нужно прописывать внутри тегов
            //hash: true, // для страницы нужно считать хеш
            template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
          }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'}),
            require('autoprefixer'),
            require('cssnano')({ // подключили cssnano
                preset: 'default', // выбрали настройки по умолчанию
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })

        ]
    
};