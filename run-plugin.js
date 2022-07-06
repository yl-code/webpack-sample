const webpack = require('webpack');
const config = require('./webpack-react.config');

const compiler = webpack(config);

Object.keys(compiler.hooks).forEach((hookName) => {
  // 同步钩子用 tap 注册
  // 异步钩子用 tapAsync 注册
  compiler.hooks[hookName].tap('事件名称', () => {
    console.log('run----------> ', hookName);
  });
});

compiler.run();
