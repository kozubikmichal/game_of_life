const path = require("path");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	entry: "./src/index.ts",
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: "ts-loader",
			exclude: /node_modules/
		}]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	devServer: {
		contentBase: path.resolve(__dirname, "public"),
		clientLogLevel: "info",
		publicPath: "/dist/",
		port: 4444,
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};