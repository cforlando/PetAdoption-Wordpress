var require = requirejs.config({
    baseUrl: '/code4orlando/wp-content/plugins/cfo-pet-adoption/js',
    waitSeconds: 0,
    paths: {
        "production-build" : "app-prod",
        "development-build" : "app-dev",
        "require-lib" : "vendors/require",
        "domReady" : "vendors/domReady",
        "text" : "vendors/text",
        "underscore" : "vendors/lodash",
        "backbone" : "vendors/backbone",
        "jquery" : "vendors/jquery",
        "jquery-private" : "vendors/jquery-private",
        "lightbox": "vendors/lightbox.min",
        "modernizr": "../vendors/modernizr-custom",
        "live" : "vendors/live",
        "jasmine" : "vendors/jasmine",
        "jasmine-html" : "vendors/jasmine-html",
        "jasmine-boot" : "vendors/boot",
        "jasmine-jquery" : "vendors/jasmine-jquery",
        "tests" : "tests/app",
        "test-utils" : "tests/test-utils",
        "namespace" : "modules/namespace"
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "live" : [],
        "lightbox": {
            "deps": ["jquery"]
        },
        "jasmine": [],
        "jasmine-html": {
            "deps": ["jasmine"]
        },
        "jasmine-boot": {
            "deps": ["jasmine-html"]
        },
        "jasmine-jquery": {
            "deps": ["jasmine-boot"]
        }
    }
    ,
    map: {
        // '*' means all modules will get 'jquery-private'
        // for their 'jquery' dependency.
        '*': { 'jquery': 'jquery-private' },

        // 'jquery-private' wants the real jQuery module
        // though. If this line was not here, there would
        // be an unresolvable cyclic dependency.
        'jquery-private': { 'jquery': 'jquery' }
    }
});