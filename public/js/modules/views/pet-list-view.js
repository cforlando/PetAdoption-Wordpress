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
                this.$wrap = this.$('.search-results__wrap');
                return this;
            },
            render : function(){
                var self = this;
                this.$wrap.html('');
                this.collection.each(function(petModel){
                    self.$wrap.append(new PetView({model: petModel}).render().$el)
                });
                if(this.collection.length == 0){ this.$wrap.html('<h3>0 Pets Found.</h3>')}
                return this;
            }
        });

    var el = Backbone.$('.search-results')[0];
    NameSpace.PetListView = (el)? new PetListView({el: el, collection: PetListCollection}):PetListView;
    return NameSpace.PetListView;
});