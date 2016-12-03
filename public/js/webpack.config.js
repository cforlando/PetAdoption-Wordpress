var path = require('path'),
    url = require('url'),
    fs = require('fs'),

    webpack = require('webpack'),
    ModuleReplace = webpack.NormalModuleReplacementPlugin;

module.exports = {
    entry: "app.js",
    context: path.join(process.cwd(), 'public/js/'),
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
        root: path.join(process.cwd(), 'public/js/'),
        modulesDirectories: ['./', path.join(process.cwd(), 'node_modules')],
        extensions: ['', '.js', '.jsx'],
        alias: {
            "production-build": "app",

            "namespace": "modules/namespace",

            "underscore": "lodash",
            "slick": "slick-carousel",
            "modernizr": "vendors/modernizr-custom",
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
        /*
        new webpack.optimize.UglifyJsPlugin({
            compress : {
                drop_console : true,
                drop_debugger : true
            }
        }),
        */
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
