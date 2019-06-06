const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true', path.resolve(__dirname, '../src/index.js')],
  output: {
	  path: '/',
    filename: '[name].[hash:8].js',
    publicPath: '/' // 打包后资源的根目录
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin()
  ]
});
