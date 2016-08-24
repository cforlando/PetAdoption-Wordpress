var require = requirejs.config({
    baseUrl: '/cfo-pas/wp-content/plugins/PetAdoption-Wordpress/public/js',
    waitSeconds: 0,
    context: 'cfopetadoption',
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
        "slick" : "vendors/slick/slick/slick",
        "backbone" : "vendors/backbone/backbone",
        "modernizr": "../vendors/modernizr-custom",
        "live" : "vendors/live",
        
        "jquery" : "vendors/jquery-custom"
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "live" : []
    }
});
