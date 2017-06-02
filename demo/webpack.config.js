const path = require('path')
const fs = require('fs')

let webpack = require('webpack')

const options = {
    // 是否缓存
    cache: true,
    // 是否监听文件变化
    watch: true,

    // 入口配置
    entry: {
        todo: './test/todo.js',
        swift: './index.js'
    },
    // 输出配置
    output: {
        path: path.resolve(__dirname, './../dist'),
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    module: {
        rules: [
            // 与1.0相比，loader的名字要写完整，loader相关的option也移动到单个loader内部
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["es2015"],
                            plugins: ['plugin-transform-swift-jsx', 'transform-class-properties', 'transform-object-rest-spread']
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        // 与1.0版本相比，移除了空字符串
        extensions: [
            '.js'
        ],
        // bieming
        alias: {
        }
    },
    target: "web", // enum
    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules

    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.

    context: __dirname,
}

module.exports = options
