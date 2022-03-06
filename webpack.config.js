const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	mode: process.env.NODE_ENV,
	entry: {
		app: path.resolve(__dirname, "./frontend/App.jsx"),
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "docs")
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				use: {
					loader: "babel-loader",
					options: {
						"presets": [
							"@babel/preset-react"
						],
						"plugins": [
							"@babel/plugin-proposal-class-properties",
							"@babel/plugin-transform-runtime"
						],
						"only": [
							path.resolve(__dirname, "./frontend"),
						]
					}
				}
			},
			{
				test: /\.css/,
				use: [ "style-loader","css-loader" ]
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?/,
				use: {
					loader: "babel-loader",
					options: {
						"presets": [
							"@babel/preset-react"
						],
						"plugins": [
							"@babel/plugin-proposal-class-properties",
							"@babel/plugin-transform-runtime"
						]
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "frontend/app.html"),
			chunks : ["app"],
			filename: "index.html"
		})
	]
}