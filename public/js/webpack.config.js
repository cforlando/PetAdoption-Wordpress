var path = require('path'),
    url = require('url'),
    fs = require('fs'),

    webpack = require('webpack'),
    ModuleReplace = webpack.NormalModuleReplacementPlugin;

module.exports = {
    entry: "app-dev.js",
    context: path.resolve(__dirname, 'public/js/'),
    output: {
        path: './public/js/',
        filename: "cfo-pas-public.js"
    },
    module: {
        loaders: [
            {
                test: /\.md$/,
                loader: 'raw!'
            },
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }
        ]
    },
    resolve: {
        root: path.resolve(__dirname, 'public/js/'),
        modulesDirectories: ['./', '../../node_modules'],
        extensions: ['', '.js', '.jsx'],
        alias: {
            "production-build": "app-prod",
            "development-build": "app-dev",

            "require-lib": "vendors/requirejs/require",
            "domReady": "vendors/domReady/domReady",
            "text": "vendors/text/text",

            "namespace": "modules/namespace",

            "bootstrap": "vendors/bootstrap.min",
            "async": "vendors/async/dist/async",
            "selectize": "vendors/selectize.js/dist/js/standalone/selectize",
            "underscore": "vendors/lodash/dist/lodash",
            "remodal": "vendors/Remodal/dist/remodal",
            "slick": "vendors/slick/slick/slick",
            "backbone": "vendors/backbone/backbone",
            "modernizr": "../vendors/modernizr-custom",
            "live": "vendors/live",

            "jquery": "vendors/jquery-custom"
        }
    },
    shim: {
        "live": [],
        'modernizr': {
            "exports": 'Modernizr'
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress : {
                drop_console : true,
                drop_debugger : true
            }
        }),
        // Hack for requirejs's domReady plugin
        new ModuleReplace(/^(domReady\!)$/, 'modules/null-module'),

        // Hack for requirejs's text plugin
        new ModuleReplace(/^text!.+$/, function (ctx) {
            ctx.request = ctx.request.replace(/text!/, 'raw!');
        }),

        // Hack for requirejs's css plugin
        new ModuleReplace(/^css!.+$/, function (ctx) {
            ctx.request = 'style!' + ctx.request;
        })
    ],
    node: {
        'path': true,
        'url': true
    }
};
