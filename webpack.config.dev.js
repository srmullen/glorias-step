const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
    devtool: "eval-source-map",
    entry: [
        "./server/index"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins:[
        new DashboardPlugin({
            port: 5001
        }),
        new HtmlWebpackPlugin({
            template: "./server/index.html"
        })
    ],
    node: {fs: "empty"},
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"]
        },
        {
            test: /\.js$/,
            loaders: ["babel-loader"],
            include: [path.resolve(__dirname, "server"), path.resolve(__dirname, "boethius"), path.resolve(__dirname, "boethius-lang")],
            exclude: /lang/
        }, {
            test: [/\.bth/, "lang.js"],
            loader: "raw-loader"
        }, {
            test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader : 'file-loader'
        }]
    },
    devServer: {
        contentBase: "./dist"
    }
}
