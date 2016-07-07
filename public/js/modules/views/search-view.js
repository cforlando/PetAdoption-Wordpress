define([
    'require',
    'namespace',
    'modules/models/search-model',
    'modules/models/pet-data',
    'text!modules/views/html/search-field.ejs',
    'domReady!',
    'selectize',
    'remodal',
    'modules/models/pet-collection',
    'backbone'
], function (require) {
    var Backbone = require('backbone'),
        NameSpace = require('namespace'),
        selectize = require('selectize'),
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
                this.listenTo(SearchModel, 'change', this.renderSearchChips);
                this.render();
                return this;
            },
            events: {
                'submit form': 'onSubmit',
                'change form .field--species select': 'onPetTypeChange',
                'click .toggle--advanced-options .toggle__link': 'onToggleAdvancedOptions',
                'click .prop-chip' : 'onClickPropChip'
            },
            onPetTypeChange: function () {
                console.log('SearchView.onPetTypeChange() - %o', SearchModel);
                SearchModel.set('species', this.$activeType.val());
                this.renderSearchFields();
            },
            onToggleAdvancedOptions: function (evt) {
                if (evt && evt.preventDefault) evt.preventDefault();
                // this.$el.toggleClass("advanced-view");
                this.searchFieldsView.open();
            },
            onClickPropChip : function(evt){
                var propName = this.$(evt.currentTarget).attr('data-prop-name');
                SearchModel.unset(propName);
            },
            onSubmit: function (evt) {
                if (evt && evt.preventDefault) evt.preventDefault();
                console.log('submitted: %O', SearchModel.toJSON());
                var self = this,
                    query = _.pickBy(SearchModel.toJSON(), function(propVal, propName){
                        return propVal;
                    });
                console.log('Searching %o', query);
                petData.findPets(query, {
                    callback: function (err, result, service) {
                        if (err) {
                            throw err;
                        } else {
                            PetList.reset(result);
                        };
                        console.log('result: %O', err || result);
                    }
                });
            },
            inputTemplate: require('text!modules/views/html/search-field.ejs'),
            renderSearchChips : function(){
                console.log('SearchView.renderSearchChips()');
                var self = this;
                this.$searchChips.html('');
                _.forEach(SearchModel.attributes, function(propVal, propName){
                    if(propVal){
                        self.$searchChips.append("<div class='prop-chip' data-prop-name='"+ propName + "'>" + propVal + "</div>");
                    }
                });
            },
            renderSearchFields: function () {
                console.log("rendering for %s", SearchModel.get('species'));
                var self = this,
                    searchFieldCompiler = _.template(self.inputTemplate, {
                        variable: 'data'
                    }),
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
                $searchFieldBlock.html('');

                // render search fields
                for (var propName in petProps) {
                    if (petProps.hasOwnProperty(propName) && _.indexOf(permittedSearchFields, propName) >= 0) {
                        console.log('rendering search field: %s', propName);
                        if (petProps[propName].options && petProps[propName].options.length > 1) {
                            var searchFieldHTML = searchFieldCompiler({
                                    label: petProps[propName]['fieldLabel'],
                                    props: petProps[propName],
                                    className: propName,
                                    options: petProps[propName].options.map(function (val, index) {
                                        return {
                                            value: val,
                                            label: val
                                        }
                                    })
                                }),
                                $searchField = Backbone.$(searchFieldHTML);
                            $searchFieldBlock.append($searchField);
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
                Backbone.$(document).on('closed', '.remodal', function (evt) {
                    if(evt.reason) {
                        var $field,
                            fieldVal;
                        _.forEach(SearchModel.visibleFields, function (fieldName, index){ 
                            $field = self.$searchFields.find('.property__input.' + fieldName);
                            fieldVal = $field.val();
                            if(fieldVal){
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
                return this;
            }
        });

    // var el = Backbone.$('#search')[0];
    var el = document.getElementById('search');
    NameSpace.SearchView = (el) ? new SearchView({el: el, model: SearchModel}) : SearchView;
    return NameSpace.SearchView;
});
