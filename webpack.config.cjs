/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'public'),
    clean: true,
    publicPath: '/public/',
  },
  devServer: {
    compress: true,
    hot: true,
    port: 3000,
    host: 'localhost',
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/public/',
    proxy: {
      context: ['/files', 'files/:id/poster'],
      target: 'http://localhost:4000',
    },
    historyApiFallback: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      favicon: 'template/favicon.ico',
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.less$/i,
        use: [{ loader: 'less-loader' }],
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [{ loader: 'url-loader' }],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      // {
      //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'webfonts',
      //       publicPath: '../webfonts',
      //     },
      //   },
      // },
    ],
  },
};
