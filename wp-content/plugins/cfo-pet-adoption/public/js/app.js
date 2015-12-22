var headers = {"X-Parse-Application-Id": parse.apikey, "X-Parse-REST-API-Key": parse.restapikey};

// Search through pets
(function (jQuery) {
  jQuery.expr[':'].Contains = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  };
  function searchPets(header, pets) {
    jQuery('#petsearch').change(function() {
      var filter = jQuery(this).val();
      if (filter) {
        var matches = jQuery(pets).find("ul:Contains(" + filter + ")").slideDown();
        jQuery('ul', pets).not(matches).slideUp();
        matches.slideDown();
      } else {
        jQuery(pets).find("ul").slideDown();
      }
      return false;
    })
    .keyup(function() {
      jQuery(this).change();
    });
  }
  jQuery(function () {
    searchPets(jQuery("#petsearch-box"), jQuery("#pets"));
  });
}(jQuery));

// Lets get the pet data
function getData() {
  jQuery.ajax({
    url: 'https://api.parse.com/1/classes/Animal',
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    dataType: 'json',
    headers: headers,
    success: function(data, status) {
      console.log(status+': Success');
      var result = "";
      for(var i = 0; i < data.results.length; i++) {
        var pets = data.results[i];
        var html = "<ul>"+
                      "<li>Name: " +pets.name+"</li>"+
                      "<img src='' />"+
                      "<li>Breed: " +pets.breed+"</li>"+
                      "<li>Species: " +pets.species+"</li>"+
                      "<li>Color: " +pets.color+"</li>"+
                      "<li>Found Location: " +pets.found_loc+"</li>"+
                      "<li>Found Zip: " +pets.found_zip+"</li>"+
                      "<li>Age: " +pets.age+"</li>"+
                      "<li>Sex: " +pets.sex+"</li>"+
                      "<li>Medical Needs: " +pets.med_needs+"</li>"+
                      "<li>Activity Level: " +pets.activity_level+"</li>"+
                      "<li>Weight: " +pets.max_lb+"</li>"+
                      "<li>Fixed: " +pets.fixed+"</li>"+
                      "<li>Declawed: " +pets.declawed+"</li>"+
                      "<li>Housebroken: " +pets.housebroken+"</li>"+
                      "<li>Can Adopt: " +pets.can_adopt+"</li>"+
                      "<li>Good With Kids?: " +pets.goodwith_kids+"</li>"+
                      "<li>Good With Dogs?: " +pets.goodwith_dogs+"</li>"+
                      "<li>Good With Cats?: " +pets.goodwith_cats+"</li>"+
                      "<li>Good With Other?: " +pets.goodwith_other+"</li>"+
                      "<li>Lost: " +pets.lost+"</li>"+
                      "<li>Intake: " +pets.intake+"</li>"+
                      "<li>Adoptable Date: " +pets.adoptable+"</li>"+
                      "<li>Contacts: " +pets.contacts+"</li>"+
                      "<li>Links: " +pets.links+"</li>"+
                    "</ul>";
        jQuery('#pets').append(html);
      }
    },
    error: function(data) {
      console.error('failed to get pets');
    }
  });
};

setTimeout(function() {
  getData();
}, 1000);
