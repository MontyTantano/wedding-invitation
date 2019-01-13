const { resolve } = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function client(opts) {
  const devMode = opts.mode !== 'production';

  return {
    target: 'node',
    entry: { server: ['./src/server.js'] },
    output: {
      filename: `[name].js`,
      path: resolve(__dirname, 'dist')
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
                    modules: 'commonjs'
                  }
                ],
                '@babel/preset-react'
              ]
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
    }
  };
};
