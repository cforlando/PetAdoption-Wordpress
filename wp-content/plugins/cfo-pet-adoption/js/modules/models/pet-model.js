define([
    'require',
    'namespace',
    'backbone'
], function(require){
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        PetModel = Backbone.Model.extend({
            defaults : {

            },
            initialize : function(){
                if(this.get('featured_image')){
                    this.set('photo', this.get('featured_image')['source']);
                } else {
                    this.set('photo', 'https://placehold.it/500x500');
                }
            }
        });

    NameSpace.PetModel = PetModel;
    return NameSpace.PetModel;
});