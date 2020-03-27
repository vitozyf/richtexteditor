const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    //  you should know that the HtmlWebpackPlugin by default will generate its own index.html
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'head'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css'
    })
  ],
  output: {
    filename: '[name].[contenthash].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    contentBase: '../dist',
    before: function(app, server, compiler) {
      app.get('/locale/zh-cn', function(req, res) {
        try {
          const lang = fs.readFileSync(
            path.join(__dirname, '../dist/locale/zh-cn.js'),
            'utf8'
          );
          if (lang) {
            res.end(lang);
          }
        } catch (error) {
          res.json({ code: 1, err: error.message });
        }
      });
    }
  }
});
