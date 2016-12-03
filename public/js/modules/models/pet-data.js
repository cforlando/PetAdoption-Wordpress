define([
    'require',
    'namespace',
    'async',
    'backbone'
], function(require) {
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        async = require('async'),
        PetDataService = Backbone.Model.extend({
            defaults: {
                types: ['cat', 'dog'],
                domain: window.PetAdoption['domain'] || ''
            },
            initialize: function() {
                return this;
            },
            /**
             *
             * @param {Object} [options]
             * @param {Object} [options.context]
             * @param {Function} [options.complete]
             */
            getTypes: function(options) {
                var self = this,
                    _options = _.defaults(options, {
                        context: self
                    });

                Backbone.$.ajax({
                    url: self.get('domain') + '/api/v1/species',
                    dataType: 'json',
                    crossDomain: true,
                    success: function(data, response) {
                        self.set('types', data);
                        _options.complete.call(_options.context, null, self.get('types'));
                    },
                    error: function() {
                        console.error(arguments);
                        _options.complete.call(_options.context, new Error("Could not update species lists"), self.get('types'));
                    }
                });
            },
            /**
             *
             * @param {Object} [options]
             * @param {Object} [options.context]
             * @param {Function} [options.complete]
             */
            getModels: function(options) {
                var self = this,
                    _options = _.defaults(options, {
                        context: self
                    });
                this.getTypes({
                    context: self,
                    complete: function() {
                        async.each(self.get('types'), function each(petType, done) {

                            Backbone.$.ajax({
                                url: self.get('domain') + '/api/v1/model/' + petType,
                                dataType: 'json',
                                crossDomain: true,
                                success: function(data, response) {
                                    console.log('getModels() - data: %s - %O\nresponse: %o', petType, data, response);
                                    self.set(petType, data);
                                },
                                error: function() {
                                    console.error(arguments);
                                },
                                complete: function() {
                                    done();
                                }
                            });

                        }, function complete() {
                            if (_options.complete) _options.complete.apply(_options.context);
                        });
                    }
                })


            },
            findPets: function(query, options) {
                var self = this,
                    _options = _.defaults(options, {}),
                    formattedQuery = (function() {
                        var ignoreCaseProp = [];
                        _.forEach(query, function(propVal, propName) {
                            ignoreCaseProp.push(propName);
                        });
                        return _.defaults(query, {
                            ignoreCase: ignoreCaseProp
                        });
                    })();
                console.log('petData.findPets(%o)', formattedQuery);
                Backbone.$.ajax({
                    url: self.get('domain') + '/api/v2/query',
                    data: formattedQuery,
                    method: 'POST',
                    crossDomain: true,
                    success: function(data, response) {
                        console.log('petData.findPets() - received data: %O\nresponse: %o', data, response);
                        self.set('pets', data);
                        if (_options.callback) _options.callback.apply(_options.context, [null, data, self]);
                    },
                    error: function() {
                        console.error(arguments);
                        if (_options.callback) _options.callback.apply(_options.context, [new Error("Could not complete query"), null, self]);
                    }
                });
                return this;
            }
        });
    NameSpace.petDataService = new PetDataService();
    return NameSpace.petDataService;
});