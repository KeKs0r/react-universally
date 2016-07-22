const webpackConfigFactory = require('./webpackConfigFactory');

module.exports = function clientConfigFactory(options = {}, args = {}) {
  const { mode = 'development' } = options;
  const config = webpackConfigFactory({ target: 'client', mode }, args);
  console.log(config);
  return config;
};
