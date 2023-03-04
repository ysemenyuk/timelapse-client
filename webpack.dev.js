// eslint-disable-next-line import/no-extraneous-dependencies
import { merge } from 'webpack-merge';
import path from 'path';
import common from './webpack.config.js';

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    hot: true,
    port: 3000,
    host: 'localhost',
    contentBase: path.join(process.cwd(), 'public'),
    publicPath: '/public/',
    proxy: {
      context: ['/files'],
      target: 'http://localhost:4000',
    },
    historyApiFallback: true,
    open: true,
  },
});
