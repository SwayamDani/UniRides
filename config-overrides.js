// config-overrides.js
const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    http: require.resolve('stream-http'),
    path: require.resolve('path-browserify'),
    net: require.resolve('net-browserify'),
    url: require.resolve('url/'),
    querystring: require.resolve('querystring-es3'),
  };
  return config;
};