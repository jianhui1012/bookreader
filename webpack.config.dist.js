var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

//定义地址
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, 'index.js'); //根目录文件app.jsx地址
var BUILD_PATH = path.resolve(ROOT_PATH, 'build/dist'); //发布文件所存放的目录/build/dist/前面加/报错？


module.exports = {
    entry: {
        app: APP_FILE,
        common: [
            "react",
            'react-dom',
            'react-router',
            'redux',
            'react-redux',
            'redux-thunk',
            'immutable'
        ]
    },
    output: {
        //publicPath: './dist/', //编译好的文件，在服务器的路径,域名会自动添加到前面
        publicPath: '/dist/', //编译好的文件，在服务器的路径,域名会自动添加到前面
        path: BUILD_PATH, //编译到当前目录
        filename: '[name].js', //编译后的文件名字
        chunkFilename: '[name].[chunkhash:5].min.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /^node_modules$/,
            use: 'babel-loader',
            include: [APP_PATH]
        }, {
            test: /\.css$/,
            exclude: /^node_modules$/,
            use:ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','autoprefixer-loader']}),
            include: [APP_PATH]
        }, {
            test: /\.less$/,
            use:ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','autoprefixer-loader','less-loader']}),
        }, {
            test: /\.scss$/,
            exclude: /^node_modules$/,
            use:ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','autoprefixer-loader','sass-loader']}),
            include: [APP_PATH]
        }, {
            test: /\.(png|jpg)$/,
            exclude: /^node_modules$/,
            use: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
            //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            include: [APP_PATH]
        }, {
            test: /\.jsx$/,
            exclude: /^node_modules$/,
            use: ['jsx-loader', 'babel-loader'],
            include: [APP_PATH]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production') //定义生产环境
            }
        }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: '../index.html', //生成的html存放路径，相对于 path
            template: './src/template/index.html', //html模板路径
            inject: 'body',
            hash: true,
        }),
        new ExtractTextPlugin('[name].css'),
        //提取出来的样式和common.js会自动添加进发布模式的html文件中，原来的html没有
        new webpack.optimize.CommonsChunkPlugin({name:"common", filename:"common.bundle.js"}),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        })

    ],
    resolve: {
        extensions: ['.web.js', '.js', '.jsx', '.less', '.scss', '.css' , '.json'] ,//后缀名自动补全
        modules: ['node_modules', path.join(__dirname, 'node_modules')]
    }
};
