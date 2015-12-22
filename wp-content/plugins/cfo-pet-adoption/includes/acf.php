<?php

function pet_adoption_acf_json_save_point( $path ) {

    // return
    $path = plugin_dir_path( dirname( __FILE__ ) ) . 'includes/acf-json';

    var_dump_log($path, 'path: ');
    return $path;
    
}
add_filter('acf/settings/save_json', 'pet_adoption_acf_json_save_point');

function get_pet_adoption_fields(){

    //set up an array for all the URLs
    $fields = array();

    //get all the pages, posts (including CPTs)
    $post_query = new WP_Query(array(
        'post_type'         => 'pet',
        'posts_per_page'    => '-1'
    ));

    $count = 1;
    while ($post_query->have_posts() && $count--) { $post_query->the_post();

            foreach(get_fields(get_the_ID()) as $field_name =>$field_value){
                if (!(isset($fields[$field_name]) && is_array($fields[$field_name])) ) {
                    $fields[$field_name] = get_field_object($field_name, false, array('load_value' => false));
                }
            }
    }
    return $fields;
}

function show_pet_adoption_fields(){
    if (isset($_GET['show_pet_adoption_fields'])) {
        die(json_encode(get_pet_adoption_fields()));
    }
}
add_action('template_redirect', 'show_pet_adoption_fields');
?>