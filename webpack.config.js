const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // spa 入口
  // entry: './src/index.js',
  // mpa 入口
  entry: {
    index: './src/index.js',
    login: './src/login.js',
  }, // 打包的入口

  output: {
    path: resolve(__dirname, './build'), // 存放所生成资源的位置，必须是绝对路径
    // filename: 'index.js', // 生成的资源文件名
    filename: '[name]-new.js', // [name] 表示的是占位符
  }, // 打包产物的出口

  mode: 'development', //打包的模式 none production development

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }), // 将 css 文件抽取生成单独的文件

    new CleanWebpackPlugin(), // 清除上一次打包的产物
    new htmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['index', 'login'],
    }), // 以 template 为模版创建一个 html 文件并通过 script 引入对应的 chunks
    new htmlWebpackPlugin({
      template: './public/login.html',
      filename: 'login.html',
      chunks: ['login'],
    }),
  ], // 通过各种 plugin 来增强 webpack 的打包能力

  module: {
    rules: [
      {
        test: /\.css$/,
        // style-loader 通过 DOM 操作将样式语句插入到 style 标签内部
        // use: ['style-loader', 'css-loader'],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [],
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
 * chunk: 代码片段 一个 module 对应一个 chunk
 *
 * chunks: chunk 组，表示至少包含一个 chunk
 *
 * chunkName: 表示 chunks 的名称，如上面的 entry 为对象时的 key
 *
 * bundle: 一个 bundle 对应一个 chunkName
 *
 * module: 就是模块
 *
 */
