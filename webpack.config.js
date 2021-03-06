const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        clean: true,
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: "images/[hash][ext]",
                },
            },
        ],
    },
    mode: "production",
    devtool: "eval-source-map",
};
