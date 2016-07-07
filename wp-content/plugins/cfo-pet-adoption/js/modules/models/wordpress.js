define([
    'require',
    'namespace',
    'backbone'
], function(require){
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        WordPress = Backbone.Model.extend({
            initialize: function(){
                this.getPets();
                return this;
            },
            getPets : function(){
                var self = this;
                Backbone.$.ajax({
                    url : '/code4orlando/wp-json/wp/v2/pet',
                    dataType : 'json',
                    success : function(data, response){
                        console.log('data: %O\nresponse: %o', data, response);
                        self.set('pets', data);
                    },
                    error : function(){
                        console.error(arguments);
                    }
                });
                return this;
            }
        });
    NameSpace.WordPress = new WordPress();
    return NameSpace.WordPress;
});