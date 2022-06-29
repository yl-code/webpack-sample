/**
 * 自定义 loader
 *
 * loader 是一个非箭头函数, 且必须有返回值 string or buffer
 *
 */

module.exports = function (source, map, meta) {
  return source.replace('webpack', meta);
};
