const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        clean: true,
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: "production",
};
