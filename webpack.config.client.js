const { resolve } = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function client(opts) {
  const devMode = opts.mode !== 'production';
  const VERSION = opts.projectVersion;
  const devServerPORT = opts.port || 6969;

  /* plagins setup start */
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
    devServer: {
      hot: true,
      open: 'Chrome',
      port: devServerPORT
    }
  };
};
