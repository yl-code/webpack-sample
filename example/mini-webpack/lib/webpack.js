const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');
const { join, dirname } = require('path');

class Webpack {
  constructor(option) {
    const { entry, output } = option;
    this.entry = entry;
    this.output = output;
    this.modules = []; // 存放各个模块的信息 {modulePath, code, dependencies}
  }

  run() {
    // 分析需要编译的模块
    const moduleInfo = this.parse(this.entry);
    this.modules.push(moduleInfo);

    for (let i = 0; i < this.modules.length; i++) {
      const dependencies = this.modules[i].dependencies;
      if (Object.keys(dependencies).length) {
        for (const key in dependencies) {
          this.modules.push(this.parse(dependencies[key]));
        }
      }
    }
    // console.log(this.modules);

    const obj = {};
    this.modules.forEach(({ modulePath, code, dependencies }) => {
      obj[modulePath] = {
        code,
        dependencies,
      };
    });
    // console.log(obj);

    this.bundleFile(obj);
  }

  bundleFile(obj) {
    // 生成 bundle 文件

    const dpdMap = JSON.stringify(obj);
    const content = `
      (function(modulesInfo){
          // webpackBootstrap

          function require(modulePath){

            function fixPath(relativePath){
              const fullPath = modulesInfo[modulePath].dependencies[relativePath]
              return require(fullPath)
            };

            const exports = {};

            (function(require, code){
              eval(code)
            })(fixPath, modulesInfo[modulePath].code);

            return exports;
          }

          require('${this.entry}')
      })(${dpdMap})
    `;

    const { path, filename } = this.output;
    const bundlePath = join(path, filename);

    fs.writeFileSync(bundlePath, content, 'utf-8');
  }

  parse(modulePath) {
    // 分析该模块是否有依赖
    // 编译该模块
    // console.log(modulePath);

    // 读取文件
    const content = fs.readFileSync(modulePath, 'utf-8');

    // 生成 AST
    const ast = parser.parse(content, { sourceType: 'module' });
    // console.log(ast.program.body);

    // 生成依赖图谱
    const dependencies = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        const file = node.source.value;
        const fullPath = join(dirname(modulePath), file);
        dependencies[file] = fullPath;
      },
    });
    // console.log(dependencies);

    // 得到编译后的代码
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    });
    // console.log(code);

    return {
      modulePath,
      code,
      dependencies,
    };
  }
}

module.exports = Webpack;
