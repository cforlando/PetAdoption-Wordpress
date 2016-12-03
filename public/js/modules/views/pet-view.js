define([
    'require',
    'text!./html/pet.ejs',
    'namespace',
    'remodal',
    'slick',
    'text!./html/pet-details.ejs',
    'backbone'
], function(require) {
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        PetView = Backbone.View.extend({
            initialize: function(options) {
                var self = this;
                this.menu = options.menu;
                this.compilePetView = _.template(require('text!./html/pet.ejs'), {
                    imports: {
                        model: self.model
                    }
                });
                this.compilePetDetailsView = _.template(require('text!./html/pet-details.ejs'), {
                    imports: {
                        model: self.model,
                        menu: self.menu
                    }
                });
                this.render();
                return this;
            },
            className: 'pet',
            events: {
                'click .button--more-info': 'onClickMoreInfo'
            },
            onClickMoreInfo: function(evt) {
                if (evt && evt.preventDefault) evt.preventDefault();
                var self = this;
                this.$details.html(this.compilePetDetailsView());
                this.$detailsSlider = this.$details.find('.pet-photo-slider');
                this.$detailsSlider.slick({
                    arrows: true,
                    dots: true,
                    autoplaySpeed: 7000
                });
                this.detailsView.open();
                this.$detailsSlider.slick('slickSetOption', 'autoplay', true, true);

                Backbone.$(document).one('closed', '.remodal', function(evt) {
                    self.$detailsSlider.slick('unslick');
                });
            },
            render: function() {
                var self = this;
                this.$el.html(this.compilePetView());
                this.$details = this.$(".pet-details__wrap");
                this.detailsView = this.$details.remodal();
                return this;
            }
        });

    NameSpace.PetView = PetView;
    return NameSpace.PetView;
});