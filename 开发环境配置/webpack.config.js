//开发环境配置能让代码运行
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
module.exports = {
  //入口文件 
  entry: ['./src/js/index.js','./src/index.html'],
  // 输出文件
  output: {
    filename: 'js/dev.js',
    path: resolve(__dirname, 'dev'),
  },
  module: {
    rules: [
      // loader 配置
      {
        //处理less
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        //处理css
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        //处理样式中的图片
        test: /\.(jpg | png | gif )$/,
        loader: 'url-loader',
        options: {
          //减端图片名字
          name: '[hash:10].[ext]',
          //小于8kb的进行转码base64 一般8-12kb都可以转码
          limit: 8 * 1024,
          //关闭es6模块
          esModule: false,
          //指定打包到的文件名
          outputPath: 'images',
        },
      },
      {
        //处理html中的图片
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        //处理其他资源,不做改变
        exclide: /\.(html | css | less |jpg | png | gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    //plugins 配置 处理html
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, 'dev'),
    //启动gzip压缩
    compress: true,
    //   端口号3000
    port: 3000,
    //自动打开浏览器
    open: true,
    //开启HMR
    hot: true,
  },
  //开发者模式
  mode: 'development',
  devtool:"source-map"
};
