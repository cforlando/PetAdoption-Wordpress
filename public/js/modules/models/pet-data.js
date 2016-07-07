define([
    'require',
    'namespace',
    'async',
    'backbone'
], function (require) {
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        async = require('async'),
        PetDataService = Backbone.Model.extend({ defaults: {
                types: ['cat', 'dog'],
                domain: window.PetAdoption['domain'] || ''
            },
            initialize: function () {
                return this;
            },
            /**
             *
             * @param {Object} options
             * @param {Object} [options.context]
             * @param {Function} options.complete
             * @returns {PetDataService}
             */
            getModels: function (options) {
                var self = this,
                    _options = _.extend({
                        context: self
                    }, options);

                return async.each(self.get('types'), function each(petType, done) {

                    Backbone.$.ajax({
                        url: self.get('domain') + '/api/v1/model/' + petType,
                        dataType: 'json',
                        crossDomain: true,
                        success: function (data, response) {
                            console.log('getModels() - data: %s - %O\nresponse: %o', petType, data, response);
                            self.set(petType, data);
                        },
                        error: function () {
                            console.error(arguments);
                        },
                        complete: function () {
                            done();
                        }
                    });

                }, function complete() {
                    if (_options.complete) _options.complete.apply(_options.context);
                });
            },
            findPets: function (query, options) {
                var self = this,
                    formattedQuery = (function(){
                        var ignoreCaseProp = [];
                        _.forEach(query, function(propVal, propName){
                            ignoreCaseProp.push(propName);
                        });
                        return _.extend({
                            ignoreCase: ignoreCaseProp
                        }, query);
                    })(),
                    _options = _.extend({}, options);
                console.log('petData.findPets(%o)', formattedQuery);
                Backbone.$.ajax({
                    url: self.get('domain') + '/api/v2/query',
                    data: formattedQuery,
                    method: 'POST',
                    crossDomain : true,
                    success: function (data, response) {
                        console.log('petData.findPets() - received data: %O\nresponse: %o', data, response);
                        self.set('pets', data);
                        if(_options.callback) _options.callback.apply(_options.context, [null, data, self]);
                    },
                    error: function () {
                        console.error(arguments);
                        if(_options.callback) _options.callback.apply(_options.context, [new Error("Could not complete query"), null, self]);
                    }
                });
                return this;
            }
        });
    NameSpace.petDataService = new PetDataService();
    return NameSpace.petDataService;
});
