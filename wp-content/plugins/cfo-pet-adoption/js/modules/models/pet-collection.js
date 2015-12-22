define([
    'require',
    'backbone',
    'modules/models/pet-model',
    'namespace'
], function(require){
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        PetList = Backbone.Collection.extend({
            model : require('modules/models/pet-model')
        });
    NameSpace.PetList = new PetList();
    return NameSpace.PetList;
});