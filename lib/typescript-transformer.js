/* eslint-env node */
const path = require('path');
const vanillaTransformer = require('./vanilla-transformer.js');

const getTsConfig = () => {
  try {
    return require(path.resolve(process.cwd(), 'tsconfig.json'));
  } catch (error) {
    return {};
  }
};

module.exports = function transformTs(src, filename, render, staticRenderFns) {
  const compilerOptions = Object.assign({}, getTsConfig().compilerOptions, {
    sourceMap: true,
  });

  let tsc = { transpileModule: () => { throw('Typescript not available in project.'); } };
  try {
    tsc = require('typescript');
  } catch (e) {
    /* try to ignore error since most likely the caller does not use typescript */
    return '';
  }

  try {
    const { outputText, sourceMapText } = tsc.transpileModule(src, { compilerOptions });

    return vanillaTransformer(outputText, filename, render, staticRenderFns, JSON.parse(sourceMapText));
  } catch (error) {
    /* eslint-disable no-console */
    console.error('Failed to compile src with `tsc` at `vue-preprocessor`');
    console.error('TSC:', error);
    /* eslint-enable */
    return '';
  }
};