const Dotenv = require('dotenv-webpack');

module.exports = {
    "path": require.resolve("path-browserify"),
    plugins: [
	  new Dotenv({
	  	path: './.env',
	  })
	],
	App: {
		rules: [
		  enforce: "pre",
	      test: /\.js$/,
	      loader: "source-map-loader",
	      exclude: /node_modules\/@firebase\/auth/
		],
	},
};