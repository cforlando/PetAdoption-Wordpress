#Code for Orlando - Pet Adoption Wordpress Plugin

###To Install
1. Clone Directory.
2. Place cfo-pet-adoption folder into your wp-plugins folder.
3. Activate plugin in WP backend.
4. Place Shortcode `[petadoption]` on page, post, ect. to render the plugin.

###Project Structure
`/includes` contains the plugin shortcode responsible for rendering the main plugin view.
`/public` contains the main view rendered by the shortcode as well as all related css/js.

###To Do
* Connect view to petadoption parse db.
* Code out the Front End for the plugin.
* Rebase git repo to the actual plugin folder for easier development.
* Write a more comprehensive README
* Eventually add CRUD operations to WP admin to manipulate parse db.
