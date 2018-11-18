const resolve = require('path').resolve;

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin  = require("optimize-css-assets-webpack-plugin");

module.exports = (env = {}, options = {}) => {
  const devMode = options.mode !== 'production';
  
  /* plagins setup start */
  const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  });
  
  const cssPlugin = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
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
            comparisons: false,
        },
        mangle: true,
        output: {
            comments: false,
        },
    },
    cache: true,
    parallel: true,
    sourceMap:  devMode ? true : false,
  });
  /* plagins setup end */

  return {
    entry: {
      app: [
        `./src/index.js`,
      ],
    },
    output: {
      path: resolve(__dirname, 'dist'),
    },
    optimization: {
      minimizer: [
        uglifyJsPlugin,
        optimizeCSSAssetsPlugin,
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            "css-loader",
            'postcss-loader',
            "sass-loader"
          ]
        },
      ]
    },
    plugins: [
      htmlPlugin,
      cssPlugin,
    ],
    devServer: {
      open: 'Chrome',
      index: 'index.html',
      port: env.port || 6969
    },
  };
}
