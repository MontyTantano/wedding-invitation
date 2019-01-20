const { resolve } = require('path');

module.exports = function client() {
  return {
    target: 'node',
    entry: { server: ['./src/server/index.js'] },
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
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        }
      ]
    }
  };
};
