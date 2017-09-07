# Code for Orlando - Pet Adoption Wordpress Plugin

### How to install WordPress
Straight from the horse's mouth: [The Famous 5-Minute Install](https://codex.wordpress.org/Installing_WordPress#Famous_5-Minute_Install)

### How to install the plugin
1. Download zip file or clone project repo to WordPress plugins folder (`wp-content/plugins/`).
2. Activate plugin in WP Admin Panel.
3. Provide a domain address in the Pet Adoption options under the Settings menu (`http://pets.codefororlando.com` or `https://pet-adoption-server.herokuapp.com` should work).
4. Place Shortcode `[petadoption]` on page, post, etc. to render the plugin.

### Development
- `kdev-utils` provides easy compilation of javascript, stylus, and pug/jade files.
    + you can can read more about how it works on its [github repo](https://github.com/khalidhoffman/kdev-utils.git)
    + `gulp --tasks` shows a list of all possible tasks, but you'll probably only want to use:
       + `gulp build-webpack` - bundles and minifies javascript
       + `gulp sass` - compiles sass to css
       + `gulp pug-php` - compiles `admin/pug/*.pug` and `public/pug/*.pug` files
       + `gulp pug-ejs` - compiles `public/javascript/modules/views/html/*.pug` files to `.ejs` files

