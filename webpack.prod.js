// eslint-disable-next-line import/no-extraneous-dependencies
import { merge } from 'webpack-merge';
import common from './webpack.config.js';

export default merge(common, {
  mode: 'production',
});
