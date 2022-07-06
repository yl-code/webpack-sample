class TxtWebpackPlugin {
  constructor(options) {
    console.log(options);
  }

  // 自定义 plugin 必须要有 apply 方法
  apply(compiler) {
    // 在生成资源到 output 目录之前注册一个事件
    compiler.hooks.emit.tapAsync('TxtWebpackPluginEvent', (compilation, cb) => {
      // console.log(compilation.assets);

      // const source = '资源的具体内容';

      // compilation.assets['test.txt'] = {
      //   source: () => source, // 资源内容
      //   size: () => source.length, // 资源的大小
      // };

      const source = '资源的具体内容';

      compilation.assets['test.txt'] = {
        source: () => source, // 资源内容
        size: () => source.length, // 资源的大小
      };

      cb();
    });
  }
}

module.exports = TxtWebpackPlugin;
