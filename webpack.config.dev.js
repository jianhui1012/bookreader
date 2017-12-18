const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html


const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
const APP_FILE = path.resolve(APP_PATH, 'index.js'); //根目录文件app.jsx地址
const BUILD_PATH = path.resolve(ROOT_PATH, '/bookreader/dist'); //发布文件所存放的目录

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: APP_FILE
    },
    output: {
        publicPath: '/bookreader/dist/', //编译好的文件，在服务器的路径,这是静态资源引用路径
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
                NODE_ENV: JSON.stringify('development') //定义编译环境
            }
        }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: '../index.html', //生成的html存放路径，相对于 path
            template: './src/template/index.html', //html模板路径
            hash: false,
        }),
        new ExtractTextPlugin('[name].css')
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    }
};
