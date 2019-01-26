const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = function client() {
  return {
    target: 'node',
    entry: { server: ['./src/server/index.js'] },
    output: {
      filename: `[name].js`,
      path: resolve(__dirname, 'dist')
    },
    externals: [nodeExternals()],
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
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                data: '@import "constants";',
                includePaths: [resolve(__dirname, './src')]
              }
            }
          ]
        }
      ]
    }
  };
};
