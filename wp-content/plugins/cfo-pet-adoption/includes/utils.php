<?php

if(!function_exists('var_dump_log')) {
    /**
     * Prints the provided variable
     * @param $content array dump of the variable to print
     * @param string $header A tag to print as a header
     */
    function var_dump_log($content, $header = '')
    {
        ob_start();
        var_dump($content);
        $content = ob_get_clean();
        error_log($header . "\n" . $content);
    }
}
if(!function_exists('var_dump_var')) {
    /**
     * Prints the provided variable
     * @param $content array dump of the variable to print
     * @param string $header A tag to print as a header
     * @return array|string
     */
    function var_dump_var($content, $header = '')
    {
        ob_start();
        var_dump($content);
        $content = ob_get_clean();
        return $content;
    }
}

if(!function_exists('get_post_featured_img')){
    /**
     * @param string $featured_image_size A string of predefined sizes. Default is 'full'
     * @param bool $is_image_icon Whether the image is an icon (Furthers compression?)
     * @param null $the_post_ID The id of the post wanted. Null returns the current post's id.
     * @return string A URL to the provided post's featured image. If there is not one, a template image is provided.
     */
    function get_post_featured_img($featured_image_size = 'full', $is_image_icon = false, $the_post_ID = null){
        if($the_post_ID == null){
            global $post;
            $the_post_ID = $post->ID;
        }
        $thumb_url = 'http://placehold.it/1920x1080';
        $thumb_id = get_post_thumbnail_id($the_post_ID);
        $thumb_url_array = wp_get_attachment_image_src($thumb_id, $featured_image_size, $is_image_icon);
    //    $thumb_url_array = get_the_post_thumbnail($post_ID, $size);
        if (is_array($thumb_url_array)){
            $thumb_url = $thumb_url_array[0];
        }
        return $thumb_url;
    }


}