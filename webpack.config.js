const path = require("path");
const webpack = require("webpack");

const vueloader = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    mode:"development",
    entry:path.resolve(__dirname,"src/index.js"),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,"dist")
    },
    resolve: {
        extensions: ['.vue', '.js', '.json']
    },
    
    module:{
        
        rules:[
            {
                test:/\.vue$/,
                loader:"vue-loader"
            },
            {
                test:/\.css$/,
                loader:"style-loader!css-loader"
            },
            {
                test:/\.(png|jpg|gif)$/,
                loader:"url-loader?limit=43960"
            },
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude:"/node_modules/"
            }
        ],
    },
    plugins:[
        new vueloader(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"index.html"),
            file:"index.html"
        })
        
    ],
    devServer:{
        hot:true,
        open:true,
        port:"8000",
        inline:true
    }
}