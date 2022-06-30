/**
 * 自定义 loader
 *
 * loader 是一个非箭头函数, 且必须有返回值 string or buffer
 *
 * loader 通过 loader API 接收配置，this.query 指向配置 loader 时的 options 对象
 *
 * 当需要返回多个结果的函数时可以使用 this.callback
 *
 */

module.exports = function (source) {
  console.log('==============', this.query);
  const { title } = this.query;

  // 直接返回处理后的结果，只能是 string or buffer
  // return source.replace('hello', title);

  // 要返回多个信息就得使用 API：this.callback
  const info = source.replace('hello', title);

  // this.callback 的同步用法
  // this.callback(null, info, '', '传给下一个loader的参数');

  // this.callback 的异步用法
  const callback = this.async();
  setTimeout(() => {
    callback(null, info, null, '传给下一个loader的参数-异步的');
  }, 1);
};
