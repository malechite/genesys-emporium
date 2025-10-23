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

  // Add @feathersjs packages to babel-loader to transpile ESM and optional chaining
  const babelLoaderRule = config.module.rules.find(
    rule => rule.loader && rule.loader.includes('babel-loader')
  );

  if (babelLoaderRule) {
    // Modify the exclude to allow @feathersjs packages
    babelLoaderRule.exclude = /node_modules\/(?!(@feathersjs)\/).*/;
  }

  return config;
};
