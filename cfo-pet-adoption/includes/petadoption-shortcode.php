<?php
/**
 *
 * PetAdoption Shortcode
 * Renders the pet adoption app
 *
 * @package  Cforlando Pet Adoptions
 * @since    1.0.0
 */

if( get_option('petadoption') === '1') {
  function petadoption_view() {
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/views/petadoption-public.php';
  }
  add_filter('widget_text', 'shortcode_unautop');
  add_filter('widget_text', 'do_shortcode', 11);
  add_shortcode('petadoption', 'petadoption_view');
}

?>
