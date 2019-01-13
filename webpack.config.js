const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const packageJson = require('./package.json');
const configClient = require('./webpack.config.client');
const configServer = require('./webpack.config.server');

const VERSION = (packageJson.version || '').replace(/\./g, '-');

module.exports = (env = {}, options = {}) => {
  /* plagins setup start */
  const versionPlugin = new webpack.DefinePlugin({
    VERSION
  });

  const cssPlugin = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: `[name].${VERSION}.css`,
    chunkFilename: `[id].${VERSION}.css`
  });

  const webpackHMRPlugin = new webpack.HotModuleReplacementPlugin();

  const sourceMapDevToolPlugin = new webpack.SourceMapDevToolPlugin({
    filename: '../maps/[name].js.map',
    exclude: ['polyfills.js'],
    append: false
  });
  /* plagins setup end */

  const configType = env.configType || 'client';
  let getConfig;

  switch (configType) {
    case 'client':
      getConfig = configClient;
      break;
    case 'server':
      getConfig = configServer;
      break;
    default:
      break;
  }

  const result = getConfig({
    mode: options.mode,
    port: env.port,
    projectVersion: VERSION
  });

  result.plugins = [
    versionPlugin,
    cssPlugin,
    webpackHMRPlugin,
    sourceMapDevToolPlugin
  ];

  return result;
};
