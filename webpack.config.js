const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//CSS文件压缩
const OptimizeCssAssetsWebpackBlugin = require('optimize-css-assets-webpack-blugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//决定nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'; //生产环境

// 复用loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'scc-loader',
  {
    //css兼容
    loader: 'postcss-loader',
    options: {
      //package文件中添加开发环境兼容  生产环境兼容
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()],
    },
  },
];

module.exports = {
  //入口文件
  entry: './src/js/index.js',
  //输出
  output: {
    filename: 'js/built.js',
    //指定文件名
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        //css处理
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        //less处理
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader'],
      },
      {
        //js语法检查
        test: /\.js$/,
        //排除node_modules 中的js
        exclude: /\node_modules/,
        enforce: 'pre', //优先执行
        loader: 'eslint-loader',
        // 使用airbnb 进行按需兼容 记得在package中添加文件
        options: {
          fix: true, //自动修复
        },
      },
      {
        //js兼容
        test: /\.js$/,
        //排除node_modules 中的js
        exclude: /\node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: { version: 3 },
              tragets: {
                chorme: '60',
                firefox: '50',
              },
            },
          ],
        },
      },
      {
        //图片检查
        test: /\.(jpg|png|gif)/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'images', //保存文件夹名
          esModule: false,
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        //其他文件
        exclude: /\.(js|css|less|html|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    //将js中的css提出成单独文件
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
    //css文件压缩
    new OptimizeCssAssetsWebpackBlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        //压缩空格
        collapseWhitespace: true,
        //去除注释
        removeComments: true,
      },
    }),
  ],
  mode: 'production',
};
