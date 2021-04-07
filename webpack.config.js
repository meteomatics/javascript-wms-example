var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry: "./src/index.js",
  entry: {
    openlayers: './src/openlayers/index.js',
    google: './src/google/index.js',
  },
  output: {
    // filename: "index.js",
    filename: '[name].js',
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    proxy: {
      "/api/meteomatics": {
        target: "https://api.meteomatics.com",
        pathRewrite: {
          "api/meteomatics/": "",
        },
        cookieDomainRewrite: "localhost",
        changeOrigin: true,
        secure: false,
        logLevel: "info",
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'openlayers.html',
      template: 'src/openlayers/index.html',
      chunks: ['openlayers']
    }),
    new HtmlWebpackPlugin({
      filename: 'google.html',
      template: 'src/google/index.html',
      chunks: ['google']
    }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        chunks: [] })
  ],

};
