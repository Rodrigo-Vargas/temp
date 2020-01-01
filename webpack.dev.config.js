const path = require("path");
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = {
   mode: "development",
   entry: {
      site: "./src/js/index.js",
      polyfills: "./src/js/polyfills.js"
   },
   output: {
      path: "/assets/js",
      filename: (chunkData) => {
         return '/assets/js/[name].js';
      },
   },
   optimization: {
      runtimeChunk: {
         name: entrypoint => `${entrypoint.name}`
      },
      namedModules: true,
      namedChunks: true
   },
   module: {
      rules: [{
         test: /\.js$/,
         exclude: /node_modules\/(?!(error-overlay-webpack-plugin)\/).*/,
         use: {
            loader: require.resolve("babel-loader"),
            options: {
               presets: ['@babel/preset-env']
            }
         }         
      }]
   },
   plugins: [new ErrorOverlayPlugin()],
};