// Search through pets
(function ($) {
    console.debug('parse credentials:', parse);

    //extends our $/jQuery object to recognize ':Contains' selector
    $.expr[':'].Contains = function (element, index, match) {
        //TODO document function arguments\
        var elementText = element.textContent || element.innerText,
            queriedText = someArray[3].toUpperCase();
        return (elementText && elementText.toUpperCase().indexOf(queriedText) > -1);
    };

    // Lets get the pet data
    function getData() {
        console.log('downloading pet data');
        $.ajax({
            url: 'https://api.parse.com/1/classes/Animal',
            type: 'GET',
            data: 'order=-createdAt',
            contentType: 'application/json',
            dataType: 'json',
            headers: {
                "X-Parse-Application-Id": parse.apikey,
                "X-Parse-REST-API-Key": parse.restapikey
            },
            success: function (data, status) {
                console.log(status + ': Success');
                var result = "";
                for (var i = 0; i < data.results.length; i++) {
                    var pets = data.results[i],
                        html = "<ul>" +
                            "<li>Name: " + pets.name + "</li>" +
                            "<img src='' />" +
                            "<li>Breed: " + pets.breed + "</li>" +
                            "<li>Species: " + pets.species + "</li>" +
                            "<li>Color: " + pets.color + "</li>" +
                            "<li>Found Location: " + pets.found_loc + "</li>" +
                            "<li>Found Zip: " + pets.found_zip + "</li>" +
                            "<li>Age: " + pets.age + "</li>" +
                            "<li>Sex: " + pets.sex + "</li>" +
                            "<li>Medical Needs: " + pets.med_needs + "</li>" +
                            "<li>Activity Level: " + pets.activity_level + "</li>" +
                            "<li>Weight: " + pets.max_lb + "</li>" +
                            "<li>Fixed: " + pets.fixed + "</li>" +
                            "<li>Declawed: " + pets.declawed + "</li>" +
                            "<li>Housebroken: " + pets.housebroken + "</li>" +
                            "<li>Can Adopt: " + pets.can_adopt + "</li>" +
                            "<li>Good With Kids?: " + pets.goodwith_kids + "</li>" +
                            "<li>Good With Dogs?: " + pets.goodwith_dogs + "</li>" +
                            "<li>Good With Cats?: " + pets.goodwith_cats + "</li>" +
                            "<li>Good With Other?: " + pets.goodwith_other + "</li>" +
                            "<li>Lost: " + pets.lost + "</li>" +
                            "<li>Intake: " + pets.intake + "</li>" +
                            "<li>Adoptable Date: " + pets.adoptable + "</li>" +
                            "<li>Contacts: " + pets.contacts + "</li>" +
                            "<li>Links: " + pets.links + "</li>" +
                            "</ul>";
                    $('#pets').append(html);
                }
            },
            error: function (data) {
                console.error('failed to get pets', arguments);
            }
        });
    }


    $(function () {
        //ready
        try{ getData(); }
        catch(e){ console.error(e); }
        var $petsWrapper = $("#pets"),
            $pets = $petsWrapper.find('ul'),
            $searchInput = $('#petsearch');


        function search(queryText, options) {
            //TODO improve search method
            var $matches = $petsWrapper.find("ul:Contains(" + queryText + ")").slideDown();
            $petsWrapper.not($matches).slideUp();
            $matches.slideDown();
        }

        $searchInput.on('change', function () {
            var filter = $searchInput.val();
            if (filter) {
                console.log('searching for:', filter);
                search(filter);
            } else {
                // no-op "hide all" animation
                $pets.slideDown();
            }
            return false;
        }).keyup(_.debounce(function () {
            $searchInput.change();
        }));

    });

}(jQuery.noConflict(false)));
