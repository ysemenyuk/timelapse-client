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
      context: ['/files'],
      target: 'http://localhost:4000',
    },
    historyApiFallback: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html',
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
    ],
  },
};
