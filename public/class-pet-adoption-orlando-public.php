<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://louisnovick.com
 * @since      1.0.0
 *
 * @package    Pet_Adoption_Orlando
 * @subpackage Pet_Adoption_Orlando/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Pet_Adoption_Orlando
 * @subpackage Pet_Adoption_Orlando/public
 * @author     Louis <louis@louisnovick.com>
 */
class Pet_Adoption_Orlando_Public {

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $plugin_name The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $version The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string $plugin_name The name of the plugin.
     * @param      string $version The version of this plugin.
     */
    public function __construct($plugin_name, $version) {

        $this->plugin_name = $plugin_name;
        $this->version = $version;

        add_filter('widget_text', 'shortcode_unautop');
        add_filter('widget_text', 'do_shortcode', 11);
        add_shortcode('petadoption', array($this, 'petadoption_view'));

    }

    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_styles() {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Pet_Adoption_Orlando_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Pet_Adoption_Orlando_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'stylesheets/pet-adoption.css', array(), $this->version, 'all');

    }

    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts() {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Pet_Adoption_Orlando_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Pet_Adoption_Orlando_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

//        wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/pet-adoption.js', array('jquery'), $this->version, false);
//        wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/pet-adoption.js', array('require'), $this->version, false);
        wp_enqueue_script('require', plugin_dir_url(__FILE__) . 'js/vendors/requirejs/require.js', array(), $this->version, false);
        wp_enqueue_script('require-config', plugin_dir_url(__FILE__) . 'js/rjs-config.js', array('require'), $this->version, false);
        wp_enqueue_script('app', plugin_dir_url(__FILE__) . 'js/app-dev.js', array('require-config'), $this->version, false);

    }

    function petadoption_view() {
//        require_once plugin_dir_path(dirname(__FILE__)) . 'public/partials/pet-adoption-orlando-public-display.php';
        require_once plugin_dir_path(dirname(__FILE__)) . 'public/partials/search.php';
    }

}
