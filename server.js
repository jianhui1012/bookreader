var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

//代理服务器
var proxy = [{
	path: '/*/*', //必须得有一个文件地址，如果顶层文件夹名字不同，则用/*代替
	target: 'http://api.zhuishushenqi.com',  //把localhost替换成第三方的IP，解决跨域问题
	host: 'localhost',
	secure: false
}];
var server = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	progress: true,
	stats: {
		colors: true,
	},
	proxy
});

//将其他路由，全部返回index.html
server.app.get('*', function(req, res) {
	res.sendFile(__dirname + '/index.html')
});
server.listen(8088, function() {
	console.log('正常打开8088端口')
});
