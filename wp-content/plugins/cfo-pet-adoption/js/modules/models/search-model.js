define([
    'require',
    'namespace',
    'backbone'
], function(require){
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        SearchModel = Backbone.Model.extend({

        });

    NameSpace.SeachModel = new SearchModel();
    return NameSpace.SearchModel;
});