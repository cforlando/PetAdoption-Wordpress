var require = requirejs.config({
    baseUrl: '/cfo-pas/wp-content/plugins/PetAdoption-Wordpress/public/js',
    waitSeconds: 0,
    paths: {
        "production-build" : "app-prod",
        "development-build" : "app-dev",
        
        "require-lib" : "vendors/requirejs/require",
        "domReady" : "vendors/domReady/domReady",
        "text" : "vendors/text/text",
        
        "namespace" : "modules/namespace",
        
        "async" : "vendors/async/dist/async",
        "selectize" : "vendors/selectize.js/dist/js/standalone/selectize",
        "underscore" : "vendors/lodash/dist/lodash",
        "remodal" : "vendors/Remodal/dist/remodal",
        "backbone" : "vendors/backbone/backbone",
        "modernizr": "../vendors/modernizr-custom",
        "live" : "vendors/live",
        
        "jquery" : "vendors/jquery",
        "jquery-private" : "vendors/jquery-private"
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "live" : []
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