const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'; // создаем переменную для development-сборки
const isProd = !isDev;
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //очистка dist
const filename = ext => isDev ? `[name].${ext}` : `[name].[chunkhash].${ext}`;
//Оптимизация лоадеров
const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        },
        'css-loader?sourceMap'
    ]

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
}


module.exports = {
    devtool: isDev ? 'source-map' : '',
    entry: {main: './src/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js')//'[name].[chunkhash].js' // прописываем хеш в имени файла
        },
module: {
    rules: [
        { // тут описываются правила
            test: /\.js$/, // регулярное выражение, которое ищет все js файлы
            use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
            exclude: /node_modules/ // исключает папку node_modules
        },
        {
            test: /\.css$/i, // применять это правило только к CSS-файлам
            use: cssLoaders()
               // use: [ (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
               //  'css-loader',
               //  'postcss-loader'
               // ] // к этим файлам нужно применить пакеты, которые мы уже установили
        },
// пример настройки плагина image-webpack-loader
        {
            test: /\.s[ac]ss$/,
            use: cssLoaders('sass-loader')
        },
        {
            test: /\.(png|jpe?g|gif|ico|svg)$/,
            use: [
                    'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                    {
                    loader: 'image-webpack-loader',
                    options: {}
                    },
                    ]
            },
// загрузка шрифтов
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
            }           
        ]    
    },
    // избавляемся от дублей в JS файлах
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [ 
        new MiniCssExtractPlugin({filename: filename('css')}),
        
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
            // hash: true,  для страницы  нужно считать хеш
            template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
            // Оптимизация HTML
            minify: {
                collapseWhitespace: isProd
            }
          }),
        new WebpackMd5Hash(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
        ]
    
};