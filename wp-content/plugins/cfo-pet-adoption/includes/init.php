<?php

function register_pet_type(){

register_post_type('pet', array(
'labels' => array(
'name' => __('Pets', 'pet_adoption'),
'singular_name' => __('Pet', 'pet_adoption'),
'new_item' => __('New Pet', 'pet_adoption'),
'add_new_item' => __('Add New Pet', 'pet_adoption'),
'all_items' => __('All Pets', 'pet_adoption'),
'edit_item' => __('Edit Pet Information', 'pet_adoption'),
'view_item' => __('View Pet Page', 'pet_adoption'),
'not_found' => __('No Pets Found', 'pet_adoption'),
'not_found_in_trash' => __('No Pets Found In Trash', 'pet_adoption')
),
'menu_icon' => 'dashicons-share',
'rewrite' => array('slug' => 'pets'),
'description' => __('A pet for adoption', 'pet_adoption'),
'public' => true,
'publicly_queryable' => true,
'show_in_rest'       => true,
'show_ui' => true,
'hierarchical' => true,
'supports' => array('title', 'thumbnail', 'editor', 'page-attributes')
));

}

add_action('init', 'register_pet_type');
?>