const path = require("path");

module.exports = {
  entry: {
    "/background": "./example/background.js",
    "/content": "./example/content.js",
    "/popup/popup": "./example/popup/popup.js",
    "/options/options": "./example/options/options.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./build"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  node: {
    fs: "empty",
  },
  mode: "development",
  devtool: "inline-source-map",
  watch: true,
};
