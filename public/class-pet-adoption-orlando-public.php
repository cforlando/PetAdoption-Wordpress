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
        wp_enqueue_style(
            $this->plugin_name . '_material-roboto',
            "//fonts.googleapis.com/css?family=Roboto:300,400,500,700",
            array(),
            $this->version,
            'all'
        );

        wp_enqueue_style(
            $this->plugin_name . '_material-icons',
            "//fonts.googleapis.com/icon?family=Material+Icons",
            array(),
            $this->version,
            'all'
        );

        wp_enqueue_style($this->plugin_name,
            plugin_dir_url(__FILE__) . 'stylesheets/pet-adoption.css',
            array(),
            $this->version,
            'all'
        );

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

//        wp_enqueue_script('live-js', plugin_dir_url(__FILE__) . 'js/vendors/live.js', array(), $this->version, true);
        if ($this->has_shortcode('petadoption')) {
            wp_enqueue_script('app', plugin_dir_url(__FILE__) . 'js/cfo-pas-public.js', array('jquery'), $this->version, true);
        }
    }

    function petadoption_view() {
//        require_once plugin_dir_path(dirname(__FILE__)) . 'public/partials/pet-adoption-orlando-public-display.php';
        require_once plugin_dir_path(dirname(__FILE__)) . 'public/partials/search.php';
    }

    function has_shortcode($shortcode = '') {
        // taken from: https://code.tutsplus.com/articles/quick-tip-improving-shortcodes-with-the-has_shortcode-function--wp-21007
        // check the current post for the existence of a short code

        $post_to_check = get_post(get_the_ID());

        // false because we have to search through the post content first
        $found = false;

        // if no short code was provided, return false
        if (!$shortcode) {
            return $found;
        }
        // check the post content for the short code
        if ($post_to_check && stripos($post_to_check->post_content, '[' . $shortcode) !== false) {
            // we have found the short code
            $found = true;
        }

        // return our final results
        return $found;
    }
}
