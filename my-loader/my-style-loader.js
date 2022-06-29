/**
 * my-style-loader
 *
 * 操作 dom，将拿到的序列化后的 css 字符串，通过 style 标签插入到页面
 */

const less = require('less');

module.exports = function (source) {
  return `
    const style = document.createElement("style");

    style.textContent = ${source};

    document.head.appendChild(style);
  `;
};
