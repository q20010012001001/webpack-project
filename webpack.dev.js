let { smart } = require('webpack-merge')
let base = require('./webpack.base.js')
const HtmlWebpackHotPlugin = require('webpack-lylyxy-hot')
// const htmlHotPlugin = new HtmlWebpackHotPlugin()
const webpack = require('webpack')
const path = require('path')


function resolveResouce(name) {
    return path.resolve(__dirname, './src/common/css/' + name);
  }

module.exports = smart(base, {
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        open: true,
        port: 8081,
        host: '192.168.1.144',
        // host:'localhost',
        hot: true,
        inline: true,
        // progress: true,
        overlay: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://www.cctvsxt.com/',
        //         pathRewrite: { "^/api": "" },
        //         changeOrigin: true
        //     }
        // }
        before(app, server) {
            // htmlHotPlugin.setDevServer(server)
        },
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     // 定义 NODE_ENV 环境变量为 production
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('dev')
        //     }
        // }),
        // new webpack.DefinePlugin({
        //     "process.env": require("../config/dev.env")
        // }),
        // htmlHotPlugin,
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: false,
                    //   name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                    outputPath: 'images/',
                    name:'[name].[ext]'
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                        //   sourceMap: true,
                          resources: [resolveResouce('var.scss'), resolveResouce('include-media.scss')]
                        },
                    }
                ],
                exclude: /node_modules/
            },

        ]
    }
})