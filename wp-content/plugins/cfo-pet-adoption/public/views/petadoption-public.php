<?php
/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @package  Cforlando Pet Adoptions
 * @since    1.0.0
 *
 */
?>

<div class="petadoption">
  <h1>Pet Adoption</h1>
  <div id="petsearch-box">
    <form class="filterpets" action="#">
      <label for="petsearch">Search through Pets</label>
      <input type="text" id="petsearch" name="petsearch" />
    </form>
  </div>
  <div id="pets">
  </div>
</div>
<?php include(plugin_dir_path( dirname( __FILE__ ) ) . 'views/search.php'); ?>
