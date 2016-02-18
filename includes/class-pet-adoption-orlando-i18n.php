<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       http://louisnovick.com
 * @since      1.0.0
 *
 * @package    Pet_Adoption_Orlando
 * @subpackage Pet_Adoption_Orlando/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Pet_Adoption_Orlando
 * @subpackage Pet_Adoption_Orlando/includes
 * @author     Louis <louis@louisnovick.com>
 */
class Pet_Adoption_Orlando_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'pet-adoption-orlando',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
