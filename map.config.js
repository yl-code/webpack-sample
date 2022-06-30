const { resolve, join } = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 多页面打包通用方案
 *
 * 约定所有的页面入口模块和相应的 html 模版都放在同一个目录下面，如： detail、list
 *
 * setMPA 要做的就是提取页面入口的名称用于 entry 的 chunkName
 */

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryPath = glob.sync(join(__dirname, './src/*/index.js'));

  entryPath.map((path) => {
    const entryName = path.match(/src\/(.*)\/index\.js$/)[1]; // 拿到入口文件名
    entry[entryName] = path;

    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: join(__dirname, `./src/${entryName}/index.html`),
        filename: `html/${entryName}.html`,
        chunks: [entryName],
      })
    );
  });

  return { entry, htmlWebpackPlugins };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  // spa 入口
  // entry: './src/index.js',
  // mpa 入口
  entry, // 打包的入口

  output: {
    path: resolve(__dirname, './build_mpa'), // 存放所生成资源的位置，必须是绝对路径
    // filename: 'index.js', // 生成的资源文件名
    filename: 'js/[name]-new.js', // [name] 表示的是占位符
  }, // 打包产物的出口

  mode: 'development', //打包的模式 none production development

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }), // 将 css 文件抽取生成单独的文件

    new CleanWebpackPlugin(), // 清除上一次打包的产物
    //
    //
    ...htmlWebpackPlugins,
    //
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   filename: 'html/index.html',
    //   chunks: ['index'],
    // }), // 以 template 为模版创建一个 html 文件并通过 script 引入对应的 chunks
    // new HtmlWebpackPlugin({
    //   template: './public/login.html',
    //   filename: 'html/login.html',
    //   chunks: ['login'],
    // }),
  ], // 通过各种 plugin 来增强 webpack 的打包能力

  module: {
    rules: [
      {
        test: /\.css$/,
        // style-loader 通过 DOM 操作将样式语句插入到 style 标签内部
        // use: ['style-loader', 'css-loader'],

        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      //
      //
      // 自定义 loader 处理 less 文件
      // {
      //   test: /\.less$/,
      //   use: ['my-style-loader', 'my-css-loader', 'my-less-loader'],
      // },
      //
      //
      // 自定义 loader 处理 a.js 文件
      {
        test: /a\.js/,
        // use: [
        //   resolve(__dirname, './my-loader/my-loader.js'),
        //   {
        //     loader: resolve(__dirname, './my-loader/my-loader-async.js'),
        //     options: { title: '你好啊' },
        //   },
        // ],
        // 配置好了 resolveLoader 字段之后就不需要手动拼接自定义 loader 的路径了
        use: [
          'my-loader',
          {
            loader: 'my-loader-async',
            options: { title: '你好啊' },
          },
        ],
      },
      {
        // image-webpack-loader 必须在 url-loader 或 file-loader 之前使用
        test: /\.(png|gif|jpe?g|webp)$/,
        use: [
          {
            loader: 'url-loader', // url-loader 依赖于 file-loader
            options: {
              name: `[name]-${Date.now()}.[ext]`, // [ext] 文件后缀的占位符
              outputPath: 'img', // 图片资源的输出的目录
              publicPath: '../img', // 图片资源引入的公共前缀
              limit: 1024, // 单位 kb，当图片大小 小于 1024 KB 时，才将图片转换为 base64 编码
            },
          },
          'image-webpack-loader', // 进行图片压缩
        ],
      },
      {
        test: /\.(otf|eto|woff2?|svg|ttf)$/, // 对字体文件进行打包
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'font',
            publicPath: '../font',
          },
        },
      },
    ],
  }, // 通过 module.rules 来配置不同文件对应使用不同的 loader 进行加载

  resolveLoader: {
    modules: ['./node_modules', './my-loader'],
  },
};

/**
 * 打包产物是一个 自执行函数
 * (function(){
 *
 * })({})
 *
 * 传给 自执行函数 的参数称为 依赖图谱，也就是一个对象
 * {"模块的路径": 该模块被打包编译后生成的 chunk }
 *
 * chunk: 代码片段, 一个 module 对应一个 chunk
 *
 * chunks: chunk 组，表示至少包含一个 chunk
 *
 * chunkName: 表示 chunks 的名称，如上面的 entry 为对象时的 key
 *
 * bundle: 一个 bundle 对应一个 chunkName
 *
 * module: 模块，指的是一个文件
 *
 */
