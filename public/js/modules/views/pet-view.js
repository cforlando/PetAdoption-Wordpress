define([
    'require',
    'text!./html/pet.ejs',
    'namespace',
    'backbone'
], function(require){
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        PetView = Backbone.View.extend({
            initialize : function(){

                return this;
            },
            className : 'pet',
            render : function(){
                var self = this,
                    compile = _.template(require('text!./html/pet.ejs'), {
                        imports : {
                            model: self.model
                        }
                    });
                this.$el.html(compile());
                return this;
            }
        });

    NameSpace.PetView = PetView;
    return NameSpace.PetView;
});
