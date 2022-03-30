const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");   // 用于加载HTML模板
const { CleanWebpackPlugin } = require("clean-webpack-plugin");  // 用于在每次打包时删除之前形成的包
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");  // react 热更新的插件


module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: "lyx'exe",
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin(),
    new ReactRefreshWebpackPlugin()
  ]
}