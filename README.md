#Code for Orlando - Pet Adoption Wordpress Plugin

###To Install
1. In the root of WordPress installation, `git pull https://github.com/khalidhoffman/PetAdoption-Wordpress.git develop`.
2. Change the URL at [/wp-content/plugins/cfo-pet-adoption/js/modules/models/wordpress.js](wp-content/plugins/cfo-pet-adoption/js/modules/models/wordpress.js) to the correct domain.

    ```js
    Backbone.$.ajax({
        url : '[YOUR DOMAIN HERE]/wp-json/wp/v2/pet',
        dataType : 'json',
        success : function(data, response){
            self.set('pets', data);
        },
        error : function(){
            console.error(arguments);
        }
    });
    ```
    (Perhaps this could be automated, but it's probably more work than it's worth)
3. Activate plugins (WP-API, ACF, acf-to-wp-rest-api) in WP backend.
4. Import the [`ACF backup`](backups/advanced-custom-field-export.xml)
5. Place Shortcode `[petadoption]` on page, post, ect. to render the plugin.

###Project Structure


Directory  | Description
------------- | -------------
[`/backups/`](backups/)| Stores a backup of Advanced Custom Fields that should be imported to create the necessary ACF fields
[`/wp-content/plugins/rest-api`](wp-content/plugins/rest-api) | WP-API plugin directory. WP-API creates a restful API using WordPress's database.
[`/wp-content/plugins/advanced-custom-fields`](wp-content/plugins/advanced-custom-fields) | ACF plugin directory. Allows for addition of custom fields per pet/post (ie. sex, size, breed, etc.)
[`/wp-content/plugins/acf-to-wp-rest-api`](wp-content/plugins/acf-to-wp-rest-api) | Another 3rd-party plugin directory. Exposes ACF fields to WP-API
[`/wp-content/plugins/cfo-pet-adoption/gulp-utils`](wp-content/plugins/cfo-pet-adoption/gulp-utils) | Some [gulp](https://github.com/gulpjs/gulp) helper functions that I personally use for quicker front-end development (ie `gulp jade-to-sass` which sort of outputs a jade file in a sass format)
[`/wp-content/plugins/cfo-pet-adoption/includes`](wp-content/plugins/cfo-pet-adoption/includes) | cfo-pet-adoption plugin logic
[`/wp-content/plugins/cfo-pet-adoption/jade`](wp-content/plugins/cfo-pet-adoption/jade) | Jade files that render to front-end HTML code. Can be compiled by running `gulp jade-php` from the [`/wp-content/plugins/cfo-pet-adoption`](wp-content/plugins/cfo-pet-adoption) directory
[`/wp-content/plugins/cfo-pet-adoption/js`](wp-content/plugins/cfo-pet-adoption/js) | JavaScript logic divided into AMD modules for [requirejs](http://requirejs.org/). When ready for production, these can be compiled and placed in the public folder with `gulp build-js`.
[`/wp-content/plugins/cfo-pet-adoption/public`](wp-content/plugins/cfo-pet-adoption/public) | Contains all compiled CSS, JS, and PHP files for front-end.
[`/wp-content/plugins/cfo-pet-adoption/sass`](/wp-content/plugins/cfo-pet-adoption/sass) | Sass stylesheets. Can be compiled with `gulp sass`

* You'll need to run `npm install` (npm is included with [nodejs](https://nodejs.org/en/)) from the `/wp-content/plugins/cfo-pet-adoption` directory for the `gulp` functions to work.
* All compilation steps can be automated by running `gulp auto`. This will cause gulp to listen for changes and compile appropriately.

###To Do
- [ ] Implement advanced search
- [ ] Code out the Front End for the plugin.
- [ ] Write a more comprehensive README
