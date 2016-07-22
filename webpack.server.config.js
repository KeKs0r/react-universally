const webpackConfigFactory = require('./webpackConfigFactory');

module.exports = function serverConfigFactory(options = {}, args = {}) {
  const { mode = 'development' } = options;
  const config = webpackConfigFactory({ target: 'server', mode }, args);
  return config;
};
