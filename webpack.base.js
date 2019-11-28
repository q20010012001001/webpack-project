const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin-for-multihtml')
// const HtmlWebpackPlugin = require('sr-html-webpack-plugin-for-multihtml')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

// 用于优化html的创建,可加快速度
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

// 排除指定的资源文件
var HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

// 用于美化html的插件
var HtmlWebpackFormatPlugin = require('html-webpack-format-plugin')

const glob = require('glob')

var getFiles = function (filepath) {
    var files = glob.sync(filepath);
    var entries = {};
    files.forEach(function (item) {
        var pathname = path.basename(item, path.extname(item))
        entries[pathname] = item;
    });
    return entries;
}

var entryJs = getFiles('./src/*.js');

function htmlFucntion() {

    let azxcs = Object.keys(entryJs).map(val => {
        if (val == 'common') {
            return '123'
        } else {
            let exclude = process.env.NOOD_ENV == 'production'?{excludeAssets: [/bundle.js/]}:{}
            return new HtmlWebpackPlugin({
                template: `./src/views/${val}.html`,
                filename: `${val}.html`,
                chunks: ['common', `${val}`],
                alwaysWriteToDisk: true,
                ...exclude,
                multihtmlCache:true
            })
        }
    })
    azxcs.forEach((item, index) => {
        if (item == '123') {
            azxcs.splice(index, 1)
        }
    })
    return azxcs
}
module.exports = {
    entry: entryJs,
    output: {
        filename: 'remove/[name].bundle.js',
        chunkFilename: 'remove/[name].chunk.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development', /* production 生产,development 开发 */
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    externals: {
        '$': 'window.$',
        'Swiper': 'window.Swiper'
    },
    module: {
        rules: [
            
            {
                test: /\.(html|ejs)$/,
                loader: 'underscore-template-loader',
                query: {
                    attributes: ['img:src', 'x-img:src'],

                    // 指定根路径
                    parseDynamicRoutes: true,
                    root:'src',
                    
                    query:{
                        parseMacros:false
                    },

                    prependFilenameComment: __dirname,

                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    //   name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: 'font/'
                    //   name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                NOOD_ENV:JSON.stringify(process.env.NOOD_ENV)
            }
        }),
        new CopyWebpackPlugin([{
            from: __dirname + '/src/js',
            to: 'js'
        }]),
        new CopyWebpackPlugin([{
            from: __dirname + '/src/lib',
            to: 'lib'
        }]),
        ...htmlFucntion(),
        new HtmlWebpackFormatPlugin({
            indent:4,
        }),
        new HtmlWebpackHarddiskPlugin({
            outputPath: path.resolve(__dirname, 'dist')
        }),
        new HtmlWebpackExcludeAssetsPlugin(),
        // new MyPlugin(),
        new CleanWebpackPlugin(),
    ]
}