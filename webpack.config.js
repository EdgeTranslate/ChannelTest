const path = require("path");

module.exports = {
    entry: {
        "/background": "./src/background.js",
        "/content": "./src/content.js",
        "/popup/popup": "./src/popup/popup.js",
        "/options/options": "./src/options/options.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../build"),
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
    },
    node: {
        fs: "empty",
    },
    mode: "development",
    devtool: "inline-source-map",
    watch: true,
};
