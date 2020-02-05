const vueCompiler = require('vue-template-compiler');
const transformationManager = require('./lib/manager.js');
const Parser = require('./lib/parser.js');

module.exports = {
  process(src, filePath) {
    const { script, template } = vueCompiler.parseComponent(src, { pad: false });

    const { render, staticRenderFns} = Parser.extractTemplateParts(template, filePath);

    const scriptContent = Parser.extractScriptContent(script, filePath);

    return transformationManager['default'](scriptContent, filePath, render, staticRenderFns);
  },
};
