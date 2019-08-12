var path = require('path');

module.exports = {
	entry: {
		app: ['babel-polyfill', './src/index.js'],
		page: './src/index_page.js'
	},
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname),
		filename: '[name].js',
		libraryTarget: 'umd',
		library: 'AppMain'
	},

	devServer: {
		inline: false,
		contentBase: path.resolve(__dirname),
		compress: true,
		port: 9000,
		host: 'localhost',
		open: true
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		],
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components|build)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	}
}
