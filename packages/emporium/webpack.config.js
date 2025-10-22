const getWebpackConfig = require('@nrwl/react/plugins/webpack');

module.exports = (config, context) => {
  // Get the default Nx webpack config
  config = getWebpackConfig(config);

  // Add querystring polyfill alias for webpack-dev-server compatibility
  if (!config.resolve) {
    config.resolve = {};
  }
  if (!config.resolve.alias) {
    config.resolve.alias = {};
  }
  config.resolve.alias.querystring = require.resolve('querystring-es3');

  return config;
};
