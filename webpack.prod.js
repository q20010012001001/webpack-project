let {smart} = require('webpack-merge')
let base = require('./webpack.base.js')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const path = require('path')

function resolveResouce(name) {
    return path.resolve(__dirname, './src/common/css/' + name);
  }

module.exports = smart(base,{
    plugins:[
        // new webpack.DefinePlugin({
        //     // 定义 NODE_ENV 环境变量为 production
        //     'process.env': {
        //         NODE_ENV:JSON.stringify('production')
        //     }
        // }),
        new ExtractCssChunks({
            filename: 'css/[name].css',
            chunkFilename: "[id].css",
            orderWarning: true
        }),
    ],
    module:{
        rules:[
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: false,
                    //   name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                    outputPath: 'images/',
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: ExtractCssChunks.loader,
                        options: {
                            publicPath: '../',
                            hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
                            reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                          resources: [resolveResouce('var.scss'), resolveResouce('include-media.scss')]
                        },
                    }
                ],
                exclude:/node_modules/
            }
        ]
    }
})