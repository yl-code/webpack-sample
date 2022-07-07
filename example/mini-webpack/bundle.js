const Webpack = require('./lib/webpack');
const config = require('./webpack.config');

new Webpack(config).run();
