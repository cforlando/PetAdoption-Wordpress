<?php

function get_pet_adoption_fields(){

    //set up an array for all the ACF fields
    $fields = array();

    //get all pets
    $post_query = new WP_Query(array(
        'post_type'         => 'pet',
        'posts_per_page'    => '-1'
    ));

    // TODO need a less assuming method for determining acf fields. Current method requires a pet post to exist
    $count = 1; // we use the first pet to determine the necessary fields
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