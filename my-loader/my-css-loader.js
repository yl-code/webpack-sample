/**
 * my-css-loader
 *
 * 将 css 序列化成字符串
 */

const less = require('less');

module.exports = function (source) {
  return JSON.stringify(source);
};
