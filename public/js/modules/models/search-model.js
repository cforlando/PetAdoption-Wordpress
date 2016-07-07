define([
    'require',
    'namespace',
    'backbone'
], function(require){
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        SearchModel = Backbone.Model.extend({
            defaults : {
                species: null
            },
            visibleFields : ['age','color','primaryBreed','secondaryBreed','size','sex'],
            initialize : function(){
                console.log('SearchModel[%o].initialize(%o)', this, arguments)
            }
        });

    NameSpace.SearchModel = new SearchModel();
    return NameSpace.SearchModel;
});
