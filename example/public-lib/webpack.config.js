/**
 * 打包公共库 demo
 *
 */

const TerserPlugin = require('terser-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: {
    'add-number': './src/index.js',
    'add-number.min': './src/index.js',
  },
  output: {
    path: resolve(__dirname, 'umd'),
    filename: '[name].js',
    // v4 写法
    // library: 'myAdd', // 指定库名称
    // libraryTarget: 'umd', // 指定库打包出来的内容规范，取值：var this window global commonjs amd umd jsonp

    // v5 写法
    library: {
      name: 'myAdd',
      type: 'umd',
      export: 'default',
    },
  },

  optimization: {
    // 做优化相关的字段
    minimize: true,
    minimizer: [new TerserPlugin({ test: /\.min\.js$/ })],
  },
};
