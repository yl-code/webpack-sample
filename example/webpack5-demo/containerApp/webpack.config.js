/**
 * 容器应用
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  devServer: {
    port: 2345,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // 属性名：映射别名，在容器应用中，使用微应用时，使用的名称
        // 属性值：微应用的路径构成：微应用的name@服务器地址/微应用的 filename 值
        demo: 'demoA@http://localhost:1234/remoteEntry.js',
      },
    }),
  ],
};
