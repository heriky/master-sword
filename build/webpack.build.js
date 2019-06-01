const merge = require('webpack-merge');
const common = require('./webpack.common');

 // 环境相关
 const apiDomains = require('../api-domain.json');
 const env = process.env.NODE_ENV;
 const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify(env),
          API_DOMAIN: JSON.stringify(apiDomains[env])
      }
    })
  ]
});
