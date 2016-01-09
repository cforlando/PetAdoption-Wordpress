define([
    'require',
    'namespace',
    'modules/views/pet-view',
    'modules/models/pet-collection',
    'domReady!',
    'backbone'
], function(require){
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        PetView = require('modules/views/pet-view'),
        PetListCollection = require('modules/models/pet-collection'),
        PetListView = Backbone.View.extend({
            initialize : function(){
                this.listenTo(this.collection, 'reset update', this.render);
                this.$list = this.$('.search-results');
                return this;
            },
            render : function(){
                var self = this;
                this.$list.html('');
                this.collection.each(function(petModel){
                    self.$list.append(new PetView({model: petModel}).render().$el)
                });
                if(this.collection.length == 0){ this.$list.html('<h3>0 Pets Found.</h3>')}
                return this;
            }
        });

    var el = Backbone.$('.wrap-search-results')[0];
    NameSpace.PetListView = (el)? new PetListView({el: el, collection: PetListCollection}):PetListView;
    return NameSpace.PetListView;
});