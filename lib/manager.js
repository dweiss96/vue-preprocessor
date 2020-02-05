const build = method => ({ run: method });

module.exports = {
  default: () => build(require('./vanilla-transformer.js')),
  ts: () => build(require('./typescript-transformer.js')),
};
