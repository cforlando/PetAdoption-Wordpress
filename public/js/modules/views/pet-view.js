define([
    'require',
    'text!./html/pet.ejs',
    'namespace',
    'remodal',
    'backbone'
], function(require){
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        PetView = Backbone.View.extend({
            initialize : function(){

                return this;
            },
            events : {
                'click .btn--more-info .btn__link' : 'onClickMoreInfo'
            },
            onClickMoreInfo : function(evt){
                if(evt && evt.preventDefault) evt.preventDefault();
                this.detailsView.open();
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
                this.detailsView = this.$(".pet-details__wrap").remodal();
                return this;
            }
        });

    NameSpace.PetView = PetView;
    return NameSpace.PetView;
});
