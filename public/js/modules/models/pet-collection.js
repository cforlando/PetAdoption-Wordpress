var Backbone = require('backbone');

var PetModel = require('modules/models/pet-model');

var PetList = Backbone.Collection.extend({
	model: PetModel,
	initialize: function () {
		console.log('PetList[%o].initialize(%o)', this, arguments);
	}
});

module.exports = new PetList();
