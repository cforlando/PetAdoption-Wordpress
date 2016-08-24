#Code for Orlando - Pet Adoption Wordpress Plugin

###To Install
1. Install project to WordPress plugins folder (`wp-content/plugins/`).
2. Activate plugin in WP Admin Panel.
3. Provide a domain address in WP Admin Panel Settings (`http://cfo-pet-adoption-server.eastus.cloudapp.azure.com` should work).
4. Place Shortcode `[petadoption]` on page, post, etc. to render the plugin.

###Development
* Do take notice of the `.gitmodules`. There are numerous git submodules being used for the front-end development.
    + run `npm run submodules:init` to download submodules
- `gulp-utils` provides easy compilation of javascript, stylus, and pug/jade files.
    + you can can read more about how it works on its [github repo](https://github.com/khalidhoffman/gulp-utils.git)
    + `gulp --tasks` shows a list of all possible tasks, but you'll probably only want to use:
       + `gulp build-js` - bundles and minifies javascript. (specify this is not a dp-boilerplate project if asked)
       + `gulp pug-php` - compiles `admin/pug/*.pug` and `public/pug/*.pug` files
       + `gulp pug-ejs` - compiles `public/javascript/modules/views/html/*.pug` files to `.ejs` files


###To Do
- [ ] Improve design of pet details view
- [ ] Improve design of advanced search view

