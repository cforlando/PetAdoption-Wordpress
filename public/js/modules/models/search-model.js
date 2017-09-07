var Backbone = require('backbone');

var SearchModel = Backbone.Model.extend({
	defaults: {
		species: null
	},
	visibleFields: ['age', 'color', 'primaryBreed', 'secondaryBreed', 'size', 'sex'],
	initialize: function () {
		console.log('SearchModel[%o].initialize(%o)', this, arguments)
	}
});

module.exports = new SearchModel();
