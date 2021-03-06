const { resolve } = require('path');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = function client(opts) {
  const devMode = opts.mode !== 'production';
  const VERSION = opts.projectVersion;
  const devServerPORT = opts.port || 6969;

  /* plagins setup start */
  const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html'
  });

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

  const terserPlugin = new TerserPlugin({
    terserOptions: {
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
    optimization: { minimizer: [terserPlugin, optimizeCSSAssetsPlugin] },
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
            {
              loader: 'sass-loader',
              options: {
                data: '@import "constants.scss";',
                includePaths: [__dirname, 'src']
              }
            }
          ]
        }
      ]
    },
    plugins: [
      versionPlugin,
      htmlPlugin,
      cssPlugin,
      webpackHMRPlugin,
      sourceMapDevToolPlugin
    ],
    devServer: {
      inline: true,
      hot: true,
      open: 'Chrome',
      port: devServerPORT
    }
  };
};
