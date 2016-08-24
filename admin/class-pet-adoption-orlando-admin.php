<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://louisnovick.com
 * @since      1.0.0
 *
 * @package    Pet_Adoption_Orlando
 * @subpackage Pet_Adoption_Orlando/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Pet_Adoption_Orlando
 * @subpackage Pet_Adoption_Orlando/admin
 * @author     Louis <louis@louisnovick.com>
 */
class Pet_Adoption_Orlando_Admin {

    /**
     * The options name to be used in this plugin
     *
     * @since   1.0.0
     * @access  private
     * @var   string $option_namespace Option name of this plugin
     */
    private $option_namespace = 'pet_adoption';

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
     * @param      string $plugin_name The name of this plugin.
     * @param      string $version The version of this plugin.
     */
    public function __construct($plugin_name, $version) {

        $this->plugin_name = $plugin_name;
        $this->version = $version;

    }

    /**
     * Register the stylesheets for the admin area.
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

        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'stylesheets/pet-adoption-admin.css', array(), $this->version, 'all');

    }

    /**
     * Register the JavaScript for the admin area.
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

        wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/pet-adoption-orlando-admin.js', array('jquery'), $this->version, false);

    }

    /**
     * Add an options page under the Settings submenu
     *
     * @since  1.0.0
     */
    public function add_options_page() {

        $this->plugin_screen_hook_suffix = add_options_page(
            __('Pet Adoption Orlando Settings', 'pet-adoption-orlando'),
            __('Pet Adoption Orlando', 'pet-adoption-orlando'),
            'manage_options',
            $this->plugin_name,
            array($this, 'display_options_page')
        );

        // Add a General section
        add_settings_section(
            $this->option_namespace . '_general',
            __('General', 'pet-adoption-orlando'),
            array($this, $this->option_namespace . '_general'),
            $this->plugin_name
        );

        register_setting($this->plugin_name, $this->option_namespace . '_domain', array( $this, $this->option_namespace . '_sanitize_domain'));
        register_setting($this->plugin_name, $this->option_namespace . '_api_key');
        register_setting($this->plugin_name, $this->option_namespace . '_instructions');
        register_setting($this->plugin_name, $this->option_namespace . '_tel');
        register_setting($this->plugin_name, $this->option_namespace . '_email');
        register_setting($this->plugin_name, $this->option_namespace . '_web');

    }

    /**
     * Render the text for the general section
     *
     * @since  1.0.0
     */
    public function pet_adoption_general() {
        include_once 'partials/inputs.php';
    }

    public function pet_adoption_sanitize_domain($value){
        return preg_replace('/\/$/', "", $value);
    }


    /**
     * Render the options page for plugin
     *
     * @since  1.0.0
     */

    public function display_options_page() {
        include_once 'partials/pet-adoption-orlando-admin-display.php';
    }

}
