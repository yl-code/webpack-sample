/**
 * my-less-loader
 *
 * less -> css
 */

const less = require('less');

module.exports = function (source) {
  less.render(source, (error, { css }) => {
    this.callback(error, css);
  });
};
