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
                // console.log('PetModel[%o].initialize(%o)', this, arguments);
            }
        });

    NameSpace.PetModel = PetModel;
    return NameSpace.PetModel;
});