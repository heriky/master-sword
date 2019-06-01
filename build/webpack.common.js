/**
 * common中需要做什么？
 * entry， output， plugin， loader
 * 0. 基础的内容： 路径，资源路径，根路径
 * 1. output 不同的环境下，拥有不同的output
 * 2. plugin： extract-text-webpack-plugin，commonChunk
 * 3. resolve: { alias:{}, extensions: [] },
 * 4. loader
 */

 /**
  * css处理的变化：
  *   1.Extract-text-plugin转变成MiniCssExtractPlugin
  *   2. 生产模式下的需要uglyfyJs和optimizeCssAssetsPlugin
  */

 const HTMLPlugin = require('html-webpack-plugin');
 const CleanWebpackPlugin = require('clean-webpack-plugin');

 // 压缩js和css的插件
 const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
 
 // 处理下载模板复制
 const { resolve, join } = require('path');
 const srcDir = resolve(__dirname, '../src');
 
 const buildPath = resolve(__dirname, '../dist');
 
 // 系列plugins的配置
 const plugins = [
   new CleanWebpackPlugin([buildPath]),
  //  new MiniCssExtractPlugin({
  //    filename: '[name].css',
  //    chunkFilename: '[id].css'
  //  }),
   new HTMLPlugin({
     template: srcDir + '/index.html',
     inject: true // 允许css以link的方式注入
   })
 ];
 
 // 系列优化配置
 const optimization = {
   minimizer: [
     new UglifyJsPlugin({
       cache: true,
       parallel: true,
       sourceMap: false
     }),
     new OptimizeCSSAssetsPlugin()
   ]
 //   ,
 //   splitChunks: {
 //     cacheGroups: {
 //       styles: {
 //         name: 'styles',
 //         test: /\.css$/,
 //         chunks: 'all',
 //         enforce: true
 //       }
 //     }
 //   }
 };
 
 // 系列loaders的配置
 const jsLoader = [{
   test: /\.js$/,
   use: ['babel-loader'],
   include: srcDir,
   exclude: /node_modules/
 }];
 
 const cssModuleLoader = [{
   test: /\.css$/,
   use: [
     MiniCssExtractPlugin.loader,
     {
       loader: 'css-loader',
       options: {
         modules: true,
         localIdentName: '[name]__[local]__[hash:base64:5]'
       }
     },
     'postcss-loader'
   ]
 }, {
   test: /\.less$/,
   use: [
     // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
     MiniCssExtractPlugin.loader,
     'css-loader',
     'postcss-loader',
     'less-loader'
   ]
 }];
 
 const lessLoader = [{
   test: /\.css$/,
   use: [
     'style-loader',
     'css-loader',
     'postcss-loader'
   ]
 }, {
   test: /\.less$/,
   use: [
     // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
     MiniCssExtractPlugin.loader,
     'css-loader',
     'postcss-loader',
     'less-loader'
   ]
 }];
 
//  const htmlLoader = [{
//    test: /\.tpl\.html$/,
//    use: [{
//      loader: 'html-loader',
//      options: { interpolate: true }
//    }],
//    include: srcDir,
//    exclude: /(node_modules|bower_components)/
//  }, {
//    test: /^((?!tpl).)*\.html$/,
//    use: [{
//      loader: 'file-loader',
//      options: {
//        name: '[path][name]-[hash:20].[ext]'
//      }
//    }],
//    include: srcDir,
//    exclude: /(node_modules|bower_components)/
//  }];

 const htmlLoader = [{
   test: /\.html$/,
   use: [{
     loader: 'html-loader'
   }],
   exclude: /node_modules/
 }]
 
 const picLoader = [{
   test: /\.(gif|png|jpe?g|svg)$/i,
   use: [{
     loader: 'file-loader',
     options: {
       hash: 'sha512',
       digest: 'hex',
       name: '[hash:20].[ext]'
     }
   }]
 }];
 
 const fontLoader = [{
     test: /\.(woff|woff2|eot)(\?v=\d+\.\d+\.\d+)?$/,
     use: [{
       loader: 'url-loader',
       options: {
         limit: 15000,
         mimetype: 'application/font-woff',
         prefix: 'fonts'
       }
     }]
   }, {
     test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
     use: [{
       loader: 'url-loader',
       options: {
         limit: 15000,
         mimetype: 'application/octet-stream',
         prefix: 'fonts'
       }
     }]
   }, {
     test: /\.svg(#\w+)?$/,
     use: [{
       loader: 'url-loader',
       options: {
         limit: 15000,
         mimetype: 'image/svg+xml',
         prefix: 'fonts'
       }
     }]
   }];
 
 
 module.exports = {
   mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
   entry: srcDir + '/index.js',
   output: {
     filename: '[name]-[hash:20].min.js',
     path: buildPath
   },
//    externals: {
//          'angular': 'angular',
//          'angular-resource': '\'ngResource\'',
//          'angular-ui-router': '\'ui.router\'',
//          'ccms-components': '\'ccms.components\''
//    },
   resolve: {
     alias: {
       '@': srcDir
     },
     extensions: ['.js', '.ts']
   },
   optimization,
   plugins,
   module: {
     rules: [...jsLoader, ...lessLoader, ...htmlLoader, ...fontLoader, ...picLoader]
   }
 };
 