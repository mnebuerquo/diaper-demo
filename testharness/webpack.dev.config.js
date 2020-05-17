var path = require('path')

var config = {
	mode: 'development',
	entry: {
		app: ['babel-polyfill', './src/index.js'],
		page: './src/index_page.js'
	},
	output: {
		filename: '[name].js',
		publicPath: '/',
		libraryTarget: 'umd',
		library: 'AppMain',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components|build)/,
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			},
			{
				test: /\.css$/,
				loader: [ 'style-loader', 'css-loader' ]
			},
		]
	},
	devtool: 'inline-source-map',
	devServer: {
		inline: false,
		contentBase: path.resolve(__dirname),
		compress: true,
		port: process.env.PORT || 9000,
		host: 'localhost',
		open: true
	},
};

module.exports = config;
