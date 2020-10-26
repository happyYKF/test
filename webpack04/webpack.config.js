
const {resolve} =require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
            entry:'./src/index.js',
            output:{
                filename:"built.js",
                path:resolve(__dirname,"build")
            },
            module:{
                rules:[
                    // loader 配置
                ]
            },
            plugins:[
                new HtmlWebpackPlugin()
            ],
            //打包模式
            mode:"development",
            // 开发服务器devserver：自动化（自动编译，自动打开浏览器并刷新）
            
}