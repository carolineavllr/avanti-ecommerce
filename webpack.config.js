const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const products = require('./data.json');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      products: products[0].items
    })
  ],
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'images',
              esModule: false // <- here
            }
          }
        ]
      }
    ],
  },
  mode: 'development',
  output: {
    clean: true,
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
    open: true
  }
};