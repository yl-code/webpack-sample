/**
 * module-federation
 *
 * 联邦模块：用于跨应用模块共享
 *
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  devServer: {
    port: 1234,
  },
  module: {
    rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'demoA', // 当前应用的别名，全局唯一，被其他应用引入时可以作为模块的名称
      filename: 'remoteEntry.js', // 导出的文件名称，被其他应用引用的文件名称
      remotes: {}, // 作为容器角，引入其他
      exposes: {
        './index': './src/index.js',
      }, // 作为微应用角色，提供被分享出去的内容
      shared: [], //共享的依赖
    }),
  ],
};
