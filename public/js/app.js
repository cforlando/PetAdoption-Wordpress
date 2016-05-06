//console.log('bueller');

"use strict";
var $ = jQuery;

(function() {
  var api = "http://pet-adoption-server.herokuapp.com/api/v1/list/dog";
  var petList = $('#pets');
  var petNames = [];

  $.getJSON( api, {
    format: "json"
  })
    .done(function( data ) {
      //console.log(JSON.stringify(toArray(data)));
      $.each(data, function(index, pet) {
        //console.log(pet.petName.val);
        $("#pets").append("<div class='pet-card'><p class='pet-name'>"+pet.petName.val+"</p></div>");
        petNames.push(pet.petName.val);
      });
      console.log(petNames);
      $('.petsNumber').text(petNames.length);

      $('.petsSearch').keyup(function () {
        $('.pet-name').each(function() {
          if (this.innerHTML.toUpperCase().indexOf($('.petsSearch').val().toUpperCase()) == 0) {
            this.addClass("shown-pets");
          }
          else {
            this.addClass("hidden-pets").removeClass("shown-pets");
          }
        });

        $('.petsNumber').text(petNames.length);
      });

    });




})();
