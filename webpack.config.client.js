const { resolve } = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function client(opts) {
  const devMode = opts.mode !== 'production';
  const VERSION = opts.projectVersion;
  const devServerPORT = opts.port || 6969;

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

  const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({});

  const uglifyJsPlugin = new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebook/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false
      },
      mangle: true,
      output: {
        comments: false
      }
    },
    cache: true,
    parallel: true,
    sourceMap: !devMode
  });
  /* plagins setup end */

  return {
    target: 'web',
    entry: { app: [`./src/index.js`] },
    optimization: { minimizer: [uglifyJsPlugin, optimizeCSSAssetsPlugin] },
    output: {
      filename: `[name].${VERSION}.js`,
      path: resolve(__dirname, 'dist'),
      sourceMapFilename: '../maps/[name].js.map'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false
                  }
                ],
                '@babel/preset-react'
              ],
              plugins: ['react-hot-loader/babel']
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      versionPlugin,
      cssPlugin,
      webpackHMRPlugin,
      sourceMapDevToolPlugin
    ],
    devServer: {
      hot: true,
      open: 'Chrome',
      port: devServerPORT
    }
  };
};
