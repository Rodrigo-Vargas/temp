const path = require("path");

module.exports = {
  mode: "development",
  output: {
    filename: "./assets/js/site.min.js"
  },
  module: {
    rules: [{
      test: /\.js?&/,
      include: [path.resolve(__dirname, "./src/js")],
      loader: "babel-loader"
    }]
  }
};