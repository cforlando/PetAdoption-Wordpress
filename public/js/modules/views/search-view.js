var Backbone = require('backbone');
var selectize = require('selectize');
var remodal = require('remodal');
var _ = require('underscore');

var petData = require('modules/services/pet-data-service');
var SearchModel = require('modules/models/search-model');
var PetList = require('modules/models/pet-collection');

var SearchView = Backbone.View.extend({
	initialize: function () {
		this.$form = this.$('form');
		this.$activeType = this.$form.find('.field--species select');
		this.$searchFields = this.$('.advanced-options-view');
		this.$searchChips = this.$('.search-chips');
		SearchModel.set('species', this.$activeType.val());
		this.listenTo(SearchModel, 'change', this.onSearchModelChange);
		this.listenTo(petData, 'change:types', this.onSpeciesTypesChange);
		this.render();
		return this;
	},
	events: {
		'submit form': 'onSubmit',
		'change form .field--species select': 'onPetTypeChange',
		'click .button--advanced-options': 'onToggleAdvancedOptions',
		'click .chip': 'onClickPropChip'
	},
	onPetTypeChange: function () {
		SearchModel.set('species', this.$activeType.val());
		this.renderSearchFields();
	},
	onSearchModelChange: function () {
		this.renderSearchChips();
	},
	onSpeciesTypesChange: function () {
		this.renderSpeciesTypeInput();
	},
	onToggleAdvancedOptions: function (evt) {
		if (evt && evt.preventDefault) evt.preventDefault();
		var self = this;
		this.searchFieldsView.open();
		Backbone.$(document).one('closed', '.remodal', function (evt) {
			if (evt.reason && evt.reason == 'confirmation') {
				var $field,
					fieldVal;
				_.forEach(SearchModel.visibleFields, function (fieldName, index) {
					$field = self.$searchFields.find('.property__input.' + fieldName);
					fieldVal = $field.val() || $field.attr('data-value');
					if (fieldVal) {
						SearchModel.set(fieldName, fieldVal);
					} else {
						SearchModel.unset(fieldName);
					}
				})
			} else {
				_.forEach(SearchModel.visibleFields, function (fieldName, index) {
					SearchModel.unset(fieldName);
				})
			}
		});
	},
	onClickValue: function (evt) {
		evt.preventDefault();
		var $optionValue = Backbone.$(evt.currentTarget),
			$property = $optionValue.parents('.property'),
			propName = $property.attr('data-prop-name'),
			value = $optionValue.attr('data-value');

		SearchModel.set(propName, value);
	},
	onClickPropChip: function (evt) {
		var propName = this.$(evt.currentTarget).attr('data-prop-name');
		SearchModel.unset(propName);
	},
	onSubmit: function (evt) {
		if (evt && evt.preventDefault) evt.preventDefault();
		console.log('submitted: %O', SearchModel.toJSON());
		var self = this,
			query = _.pickBy(SearchModel.toJSON(), function (propVal, propName) {
				return propVal;
			});
		console.log('Searching %o', query);
		petData.findPets(query, {
			callback: function (err, result) {
				if (err) {
					throw err;
				} else {
					PetList.reset(result);
				}
				console.log('result: %O', err || result);
			}
		});
	},
	searchPropCompiler: _.template(require('raw-loader!modules/views/ejs/search-prop.ejs')),
	searchFieldCompiler: _.template(require('raw-loader!modules/views/ejs/search-field.ejs'), {
		variable: 'data'
	}),
	renderSpeciesTypeInput: function () {
		var speciesTypesOptions = petData.get('types');
		var speciesTypeInputHTML = '';
		speciesTypesOptions.forEach(function (speciesName) {
			speciesTypeInputHTML += '<option value="' + speciesName + '">' + speciesName + '</option>';
		});
		this.$activeType.html(speciesTypeInputHTML);
	},
	renderSearchChips: function () {
		var self = this;
		this.$searchChips.html('');
		_.forEach(SearchModel.attributes, function (propVal, propName) {
			if (propVal) {
				self.$searchChips.append(self.searchPropCompiler({
					propName: propName,
					propVal: propVal
				}));
			}
		});
	},
	renderSearchFields: function () {
		var self = this,
			permittedSearchFields = SearchModel.visibleFields,
			activePetType = SearchModel.get('species'),
			petProps = petData.get(activePetType),
			$searchFieldBlock = this.$searchFields.find('.advanced-options-view__wrap');

		// clear search fields and view
		for (var fieldName in petProps) {
			if (petProps.hasOwnProperty(fieldName) && fieldName !== 'species') {
				SearchModel.set(fieldName, false);
			}
		}
		$searchFieldBlock.empty();

		// render search fields
		_.forEach(petProps, function (petPropData, index) {
			var propName = petPropData.key;
			if (_.includes(permittedSearchFields, propName)) {
				if (petPropData.options && petPropData.options.length > 1) {
					var searchFieldHTML = self.searchFieldCompiler({
							label: petPropData['fieldLabel'],
							props: petPropData,
							className: propName,
							value: SearchModel.get(propName),
							options: petPropData.options.map(function (val, index) {
								return {
									value: val,
									label: val
								}
							})
						}),
						$searchField = Backbone.$(searchFieldHTML);

					$searchFieldBlock.append($searchField);
					console.log('SearchView.renderSearchFields() - rendering %s (%o) on (%o)', propName, $searchField, $searchFieldBlock);
				}
			}

		});
	},
	render: function () {
		var self = this;
		petData.getModels({
			context: self,
			complete: self.renderSearchFields
		});
		this.searchFieldsView = this.$searchFields.remodal();
		return this;
	}
});

var searchViewParams = {
	el: document.getElementById('search'),
	model: SearchModel
};

// initialize if #search element was found in DOM
module.exports = searchViewParams.el ? new SearchView(searchViewParams) : SearchView;
