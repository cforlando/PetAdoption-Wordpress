var Backbone = require('backbone');

var PetModel = Backbone.Model.extend({
	defaults: {},
	initialize: function () {
		// console.log('PetModel[%o].initialize(%o)', this, arguments);
	}
});

module.exports = PetModel;
