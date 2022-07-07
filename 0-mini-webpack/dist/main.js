
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

          require('./src/index.js')
      })({"./src/index.js":{"code":"\"use strict\";\n\nvar _a = require(\"./a.js\");\n\nconsole.log('hello bundle', _a.a);\n\nvar test = function test() {\n  return 'test';\n};","dependencies":{"./a.js":"src/a.js"}},"src/a.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.a = void 0;\n\nvar _b = require(\"./b.js\");\n\nvar a = 'A 模块+' + _b.b;\nexports.a = a;","dependencies":{"./b.js":"src/b.js"}},"src/b.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.b = void 0;\nvar b = 'B 模块';\nexports.b = b;","dependencies":{}}})
    