var path = require('path');

var webpack = require('webpack');

module.exports = {
    entry: "app.js",
    context: path.join(process.cwd(), 'public/js/'),
    output: {
        path: __dirname,
        filename: "cfo-pas-public.js"
    },
    resolve: {
        modules: [__dirname, path.join(process.cwd(), 'node_modules')],
        extensions: ['.js', '.jsx'],
        alias: {
            "production-build": "app",

            "underscore": "lodash",
            "slick": "slick-carousel",
            "modernizr": "vendors/modernizr-custom",
            "live": "vendors/live",

            "jquery": "vendors/jquery-custom"
        }
    },
	module: {
		rules: [{
			test: /modernizr/,
			use: 'exports-loader?Modernizr'
		}]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress : {
                drop_console : true,
                drop_debugger : true
            }
        })
    ],
    node: {
        'path': true,
        'url': true
    }
};
