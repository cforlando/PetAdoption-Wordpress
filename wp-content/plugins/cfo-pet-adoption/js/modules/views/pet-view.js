define([
    'require',
    'text!./html/pet.html',
    'namespace',
    'backbone'
], function(require){
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        PetView = Backbone.View.extend({
            initialize : function(){

                return this;
            },
            render : function(){
                var self = this,
                    compile = _.template(require('text!./html/pet.html'), {
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