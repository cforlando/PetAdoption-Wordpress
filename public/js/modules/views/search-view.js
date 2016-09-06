define([
    'require',
    'namespace',
    'modules/models/search-model',
    'modules/models/pet-data',
    'text!modules/views/html/search-field.ejs',
    'text!modules/views/html/search-field.ejs',
    'domReady!',
    'selectize',
    'remodal',
    'underscore',
    'modules/models/pet-collection',
    'backbone'
], function (require) {
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        selectize = require('selectize'),
        _ = require('underscore'),
        petData = require('modules/models/pet-data'),
        SearchModel = require('modules/models/search-model'),
        PetList = require('modules/models/pet-collection'),
        SearchView = Backbone.View.extend({
            initialize: function () {
                this.$form = this.$('form');
                this.$activeType = this.$form.find('.field--species select');
                this.$searchFields = this.$('.advanced-options-view');
                this.$searchChips = this.$('.search-chips');
                SearchModel.set('species', this.$activeType.val());
                this.listenTo(SearchModel, 'change', this.onSearchModelChange);
                this.render();
                return this;
            },
            events: {
                'submit form': 'onSubmit',
                'change form .field--species select': 'onPetTypeChange',
                'click .toggle--advanced-options .toggle__link': 'onToggleAdvancedOptions',
                'click .chip': 'onClickPropChip'
            },
            onPetTypeChange: function () {
                SearchModel.set('species', this.$activeType.val());
                this.renderSearchFields();
            },
            onSearchModelChange: function () {
                this.renderSearchChips();
                this.updateSearchFieldValues();
            },
            onToggleAdvancedOptions: function (evt) {
                if (evt && evt.preventDefault) evt.preventDefault();
                // this.$el.toggleClass("advanced-view");
                this.searchFieldsView.open();
                Backbone.$(document).one('closed', '.remodal', function (evt) {
                    if (evt.reason && evt.reason == 'confirmation') {
                        /*
                         var $field,
                         fieldVal;
                         _.forEach(SearchModel.visibleFields, function (fieldName, index){
                         $field = self.$searchFields.find('.property__input.' + fieldName);
                         fieldVal = $field.val() || $field.attr('data-value');
                         if(fieldVal){
                         SearchModel.set(fieldName, fieldVal);
                         } else {
                         SearchModel.unset(fieldName);
                         }
                         })
                         */
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
                    callback: function (err, result, service) {
                        if (err) {
                            throw err;
                        } else {
                            PetList.reset(result);
                        }
                        ;
                        console.log('result: %O', err || result);
                    }
                });
            },
            updateSearchFieldValues: function () {
                var self = this;
                Backbone.$('.property').each(function (index, el) {
                    var $property = Backbone.$(el),
                        $dropdownButton = $property.find('.dropdown-button');
                    $dropdownButton.html(SearchModel.get($property.attr('data-prop-name')) || $dropdownButton.attr('data-prop-label'));
                });
            },
            searchPropCompiler: _.template(require('text!modules/views/html/search-prop.ejs')),
            renderSearchChips: function () {
                var self = this;
                this.$searchChips.html('');
                _.forEach(SearchModel.attributes, function (propVal, propName) {
                    if (propVal) {
                        self.$searchChips.append(self.searchPropCompiler({
                            propName : propName,
                            propVal : propVal
                        }));
                    }
                });
            },
            searchFieldCompiler: _.template(require('text!modules/views/html/search-field.ejs'), {
                variable: 'data'
            }),
            renderSearchFields: function () {
                var self = this,
                    permittedSearchFields = SearchModel.visibleFields,
                    activePetType = SearchModel.get('species'),
                    petProps = petData.get(activePetType),
                    $searchFieldBlock = this.$searchFields.find('.advanced-options-view__wrap');

                // clear search fields and view
                for (var fieldName in petProps) {
                    if (petProps.hasOwnProperty(fieldName) && fieldName != 'species') {
                        SearchModel.set(fieldName, false);
                    }
                }
                $searchFieldBlock.empty();

                // render search fields
                for (var propName in petProps) {
                    if (petProps.hasOwnProperty(propName) && _.indexOf(permittedSearchFields, propName) >= 0) {
                        if (petProps[propName].options && petProps[propName].options.length > 1) {
                            var searchFieldHTML = this.searchFieldCompiler({
                                    label: petProps[propName]['fieldLabel'],
                                    props: petProps[propName],
                                    className: propName,
                                    value: SearchModel.get(propName),
                                    options: petProps[propName].options.map(function (val, index) {
                                        return {
                                            value: val,
                                            label: val
                                        }
                                    })
                                }),
                                $searchField = Backbone.$(searchFieldHTML),
                                $dropdown = $searchField.find('.dropdown-button');

                            $searchFieldBlock.append($searchField);
                            console.log('SearchView.renderSearchFields() - rendering %s (%o) on (%o)', propName, $searchField, $searchFieldBlock);
                            $dropdown.dropdown({});
                            $searchField.find('.property-option__value').on('click', function () {
                                self.onClickValue.apply(self, arguments);
                                var $parentDropdown = Backbone.$(this).parents('.dropdown-content').siblings('.dropdown-button');
                                console.log('closing %o', $parentDropdown);
                                $parentDropdown.dropdown('close');
                                return false;
                            });
                        }
                    }
                }
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

    // var el = Backbone.$('#search')[0];
    var el = document.getElementById('search');
    NameSpace.SearchView = (el) ? new SearchView({el: el, model: SearchModel}) : SearchView;
    return NameSpace.SearchView;
});
