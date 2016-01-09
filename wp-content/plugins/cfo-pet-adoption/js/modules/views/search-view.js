define([
    'require',
    'namespace',
    'modules/models/search-model',
    'domReady!',
    'modules/models/wordpress',
    'modules/models/pet-collection',
    'backbone'
], function(require){
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        WordPress = require('modules/models/wordpress'),
        SearchModel = require('modules/models/search-model'),
        PetList = require('modules/models/pet-collection'),
        SearchView = Backbone.View.extend({
            initialize : function(){
                this.$form = this.$('form');
                return this;
            },
            events : {
                'submit form' : 'onSubmit',
                'click .advanced-options-toggle' : 'onToggleAdvancedOptions'
            },
            onToggleAdvancedOptions : function(evt){
                if(evt && evt.preventDefault) evt.preventDefault();
                this.$el.toggleClass("advanced-view");
            },
            onSubmit : function(evt){
                if(evt && evt.preventDefault) evt.preventDefault();
                console.log('submitted: %O', this.$form.serializeArray());
                var self = this,
                    query = _.filter(this.$form.serializeArray(), function(field, index, arr){
                        // remove default fields
                        return (field.name != field.value);
                    }),
                    formattedQuery = {
                        acf : {}
                    };
                console.log('searching for: %O', query);



                // created a search fields object that has structure compatible with wp-api
                _.forEach(query, function(field, index){
                    formattedQuery.acf[field.name] = field.value.toLowerCase();
                });

                console.log('formatted: %O', formattedQuery);

                var result = _.filter(WordPress.get('pets'), formattedQuery);
                PetList.reset(result);
                console.log('result: %O', result);
            },
            render : function(){

                return this;
            }
        });

    var el = Backbone.$('#container-search')[0];
    NameSpace.SearchView = (el)? new SearchView({el: el, model : SearchModel}):SearchView;
    return NameSpace.SearchView;
});