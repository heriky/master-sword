const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfigration = require('./webpack.dev');

const compiler = webpack(webpackConfigration);
const express = require('express');
const app = express();

// 配置开发环境及热启动
app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: webpackConfigration.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 10 * 1000
}));


// 店铺选择器代理
var proxy = require('http-proxy-middleware');


// app.use(jsonServer.defaults({ static: path.resolve(__dirname, '../') }));

app.use(express.static(path.resolve(__dirname, '../')));

app.listen(8888, err => {
	if (err) {
		console.log(err);
		return;
	}

	const url = `http://127.0.0.1:8888/index.html`;
	console.log(`Listening at ${url}`);
});
