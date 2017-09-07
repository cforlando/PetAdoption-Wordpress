var Backbone = require('backbone');
var slick = require('slick-carousel');

var PetView = Backbone.View.extend({
	initialize: function (options) {
		var self = this;
		this.menu = options.menu;
		this.compilePetView = _.template(require('raw-loader!./ejs/pet.ejs'), {
			imports: {
				model: self.model,
				apiDomain: window.PetAdoption['domain']
			}
		});
		this.compilePetDetailsView = _.template(require('raw-loader!./ejs/pet-details.ejs'), {
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
	onClickMoreInfo: function (evt) {
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

		Backbone.$(document).one('closed', '.remodal', function (evt) {
			self.$detailsSlider.slick('unslick');
		});
	},
	render: function () {
		var self = this;
		this.$el.html(this.compilePetView());
		this.$details = this.$(".pet-details__wrap");
		this.detailsView = this.$details.remodal();
		return this;
	}
});

module.exports = PetView;
