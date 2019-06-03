const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const buildOutputDir = path.join(__dirname, '../dist');

 // 环境相关
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: {
		components: path.resolve(__dirname, '../src/components/index.js'),
		utils: path.resolve(__dirname, '../src/utils/index.js'),
		index: path.resolve(__dirname, '../index.js')
	},
	output: {
		path: buildOutputDir,
		filename: '[name].js',
		libraryTarget: 'umd'
	},
  plugins: [
    new CleanWebpackPlugin(),
  ]
});
