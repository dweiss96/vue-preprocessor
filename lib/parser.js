const fs = require('fs');
const path = require('path');
const vueCompiler = require('vue-template-compiler');
const vueNextCompiler = require('vue-template-es2015-compiler');

const safeStringReadTrimmed = (obj, path) => {
  try {
    return obj[path].trim();
  } catch (e) {
    return '';
  }
};

const extractHTML = (template, templatePath) => {
  let resultHTML = '';

  if (template.content === '' && template.src !== '') {
    template.content = fs.readFileSync(
      path.resolve(path.dirname(templatePath), template.src),
      'utf8'
    );
  }

  if (!template.lang || template.lang === 'resultHTML') {
    resultHTML = template.content;
  } else if (template.lang === 'pug') {
    resultHTML = require('pug').compile(template.content)();
  } else {
    throw templatePath + ': unknown <template lang="' + template.lang + '">';
  }

  return resultHTML;
};

const extractScriptContent = (script, scriptPath) => {
  const scriptName = path.parse(scriptPath).base.replace('.vue', '');
  const minimalScript = `export default { name: '${scriptName}' };`;

  const content = safeStringReadTrimmed(script, 'content');
  const source = safeStringReadTrimmed(script, 'src');

  if(!content && !source) {                                // empty script
    return minimalScript;
  } else if (!content && source) {                         // content is empty but source given
    return fs.readFileSync(path.resolve(path.dirname(scriptPath), script.src), 'utf8');
  } else {                                                 // content has to be correct
    return script.content;
  }
};

const stringifyRender = render => vueNextCompiler('function render () {' + render + '}');

const stringifyStaticRender = staticRenderFns =>
  `[${staticRenderFns.map(stringifyRender).join(',')}]`;

const extractTemplateParts = (template, filePath) => {
  if (template) {
    const HTML = extractHTML(template, filePath);
    const res = HTML && vueCompiler.compile(HTML);

    return {
      render: stringifyRender(res.render),
      staticRenderFns: stringifyStaticRender(res.staticRenderFns),
    };
  } else return {
    render: undefined,
    staticRenderFns: undefined,
  };
};

module.exports = {
  extractScriptContent,
  extractTemplateParts
};
