<?php

/**
 * The plugin bootstrap file
 *
 *
 * @link              https://github.com/cforlando
 * @since             1.0.0
 * @package           Cforlando Pet Adoptions
 *
 * @wordpress-plugin
 * Plugin Name:       Cforlando Pet Adoptions
 * Plugin URI:        https://github.com/cforlando
 * Description:       Cforlando plugin to aid in the adoption of pets
 * Version:           1.0.0
 * Author:            cforlando
 * Author URI:        https://github.com/cforlando
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       Cforlando Pet Adoptions
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}
$plugin_dir = plugin_dir_path(__FILE__);
// Activate Admin
add_action('admin_menu', 'petadoption_plugin_create_menu');

function petadoption_plugin_create_menu(){

    //create new top-level menu
    add_menu_page('Petadoption Plugin Settings', 'Petadoption Settings', 'administrator', __FILE__, 'petadoption_plugin_settings_page');

    //call register settings function
    add_action('admin_init', 'register_petadoption_plugin_settings');
}


function register_petadoption_plugin_settings(){
    //register settings
    register_setting('petadoption-plugin-settings-group', 'petadoption');
    register_setting('petadoption-plugin-settings-group', 'appid');
    register_setting('petadoption-plugin-settings-group', 'restapikey');
    register_setting('petadoption-plugin-settings-group', 'pet_adoption_search_directions');
    register_setting('petadoption-plugin-settings-group', 'pet_adoption_tel');
}

function petadoption_plugin_settings_page(){ ?>
    <div class="wrap">
        <h2>CodeForOrlando Shortcodes and Filters</h2>

        <form id="pet-adoption-settings" method="post" action="options.php">
            <?php settings_fields('petadoption-plugin-settings-group'); ?>
            <?php do_settings_sections('petadoption-plugin-settings-group'); ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Activate Pet Adoption Shortcode</th>
                    <td><input type="checkbox" name="petadoption"
                               value="1" <?php checked('1', get_option('petadoption')); ?> /></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Parse-Application-Id</th>
                    <td><input type="text" name="appid" value="<?php echo get_option('appid'); ?>"/></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Parse-REST-API-Key</th>
                    <td><input type="text" name="restapikey" value="<?php echo get_option('restapikey'); ?>"/></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Phone Number</th>
                    <td><input type="text" name="pet_adoption_tel" value="<?php echo get_option('pet_adoption_tel'); ?>"/></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Directions</th>
                    <td><textarea form="pet-adoption-settings" rows=10 name="pet_adoption_search_directions"><?php echo get_option('pet_adoption_search_directions'); ?></textarea></td>
                </tr>
            </table>

            <?php submit_button(); ?>

            <!-- Admin Messages -->
            <?php

            echo '<div><p>Pet Adoption Plugin '.((get_option('petadoption') === '1')?'Activated':'Deactivated').'</p></div>';

            ?>

        </form>
    </div>
<?php } ?>

<?php
require_once plugin_dir_path(__FILE__) . 'includes/petadoption-shortcode.php';

/*==========================================
=            Styles and Scripts            =
==========================================*/
if (get_option('petadoption') === '1') {

    function petadoption_scripts(){


        //  TODO Loading via WordPress yields a conflict somewhere with 'define' function
        wp_enqueue_script(
            'require',
            plugins_url('/js/vendors/require.js', __FILE__),
            array(),
            false,
            true
        );

        wp_enqueue_script(
            'cfo-pet-adoption-rjs-config',
            plugins_url('/js/rjs-config.js', __FILE__),
            array('require'),
            false,
            true
        );

        wp_enqueue_script(
            'cfo-pet-adoption',
            plugins_url('/js/app-dev.js', __FILE__),
            array('cfo-pet-adoption-rjs-config'),
            false,
            true
        );

//        wp_enqueue_script(
//            'cfo-pet-adoption',
//            plugins_url('/public/js/pet-adoption.js', __FILE__),
//            array(),
//            false,
//            true
//        );

    }

    add_action('wp_enqueue_scripts', 'petadoption_scripts', 9999);


    function petadoption_styles() {
        wp_enqueue_style('cfo-pet-adoption-css', plugins_url('/public/stylesheets/pet-adoption.css', __FILE__));
    }
    add_action( 'wp_enqueue_scripts', 'petadoption_styles' );

    function petadoption_admin_styles() {
        wp_enqueue_style('cfo-pet-adoption-admin-css', plugins_url('/public/stylesheets/pet-adoption-admin.css', __FILE__));
    }
    add_action( 'admin_enqueue_scripts', 'petadoption_admin_styles' );

}

?>

<?php

require_once('includes/utils.php');
require_once('includes/init.php');
require_once('includes/acf.php');
?>