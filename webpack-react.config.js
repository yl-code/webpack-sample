const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TxtWebpackPlugin = require('./my-plugin/txt-webpack-plugin');

module.exports = {
  entry: {
    'w-react': './src/w-react.js',
  },
  output: {
    path: resolve(__dirname, './build'), // 存放所生成资源的位置，必须是绝对路径
    filename: 'js/[name].js', // [name] 表示的是占位符
  }, // 打包产物的出口

  mode: 'development', //打包的模式 none production development

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'html/index.html',
    }),
    new CleanWebpackPlugin(),
    new TxtWebpackPlugin({
      title: '这是一个自定义 plugin 的配置',
    }),
  ], // 通过各种 plugin 来增强 webpack 的打包能力

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // options: , // 可以将配置直接写在 .babelrc 中
        },
      },
    ],
  }, // 通过 module.rules 来配置不同文件对应使用不同的 loader 进行加载
};

/**
 * 打包产物是一个 自执行函数
 * (function(){
 *
 * })({})
 *
 * 传给 自执行函数 的参数称为 依赖图谱，也就是一个对象
 * {"模块的路径": 该模块被打包编译后生成的 chunk }
 *
 * chunk: 代码片段, 一个 module 对应一个 chunk
 *
 * chunks: chunk 组，表示至少包含一个 chunk
 *
 * chunkName: 表示 chunks 的名称，如上面的 entry 为对象时的 key
 *
 * bundle: 一个 bundle 对应一个 chunkName
 *
 * module: 模块，指的是一个文件
 *
 */
