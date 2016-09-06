<?php $apikey = get_option($this->option_namespace . '_api_key');
$domain = get_option($this->option_namespace . '_domain');
$tel = get_option($this->option_namespace . '_tel');
$email = get_option($this->option_namespace . '_email');
$web = get_option($this->option_namespace . '_web');
$image = get_option($this->option_namespace . '_image');
$directions = get_option($this->option_namespace . '_instructions'); ?><fieldset><div class="input-field"><script>jQuery(document).ready(function() {
    jQuery('#<?php echo $this->option_namespace . '_image_button'; ?>').click(function () {
        formfield = jQuery('#<?php echo $this->option_namespace . '_image'; ?>').attr('name');
        tb_show('', 'media-upload.php?type=image&TB_iframe=true');
        return false;
    });

    window.send_to_editor = function(html) {
        console.log('sending to editor');
        var imgurl = jQuery('img',html).attr('src'),
            $imageInput = jQuery('#<?php echo $this->option_namespace . '_image'; ?>');
        $imageInput.val(imgurl);
        jQuery('#<?php echo $this->option_namespace . '_image_value'; ?>').html($imageInput.val());
        tb_remove();
    }

});</script><label><?php _e("Image", "boilerplate"); ?>:</label><input type="text" hidden name="<?php echo $this->option_namespace . '_image'; ?>" id="<?php echo $this->option_namespace . '_image'; ?>" value="<?php echo $image; ?>"><input type="button" name="<?php echo $this->option_namespace . '_image_button'; ?>" id="<?php echo $this->option_namespace . '_image_button'; ?>" value="<?php _e("Upload Image", "boilerplate"); ?>"><span class="image-value" id="<?php echo $this->option_namespace . '_image_value'; ?>"><?php _e("Current: ", "boilerplate"); ?><?php echo basename($image); ?></span></div><div class="input-field"><label><?php _e("Domain", "boilerplate"); ?>:</label><input type="text" name="<?php echo $this->option_namespace . '_domain'; ?>" id="<?php echo $this->option_namespace . '_domain'; ?>" value="<?php echo $domain; ?>"></div><div class="input-field"><label><?php _e("Telephone Number", "boilerplate"); ?>:</label><input type="tel" name="<?php echo $this->option_namespace . '_tel'; ?>" id="<?php echo $this->option_namespace . '_tel'; ?>" value="<?php echo $tel; ?>"></div><div class="input-field"><label><?php _e("Email", "boilerplate"); ?>:</label><input type="email" name="<?php echo $this->option_namespace . '_email'; ?>" id="<?php echo $this->option_namespace . '_email'; ?>" value="<?php echo $email; ?>"></div><div class="input-field"><label><?php _e("Website URL", "boilerplate"); ?>:</label><input type="url" name="<?php echo $this->option_namespace . '_web'; ?>" id="<?php echo $this->option_namespace . '_web'; ?>" value="<?php echo $web; ?>"></div><div class="input-field"><label><?php _e("Instructions", "boilerplate"); ?>:</label><textarea name="<?php echo $this->option_namespace . '_instructions'; ?>" id="<?php echo $this->option_namespace . '_instructions'; ?>"><?php echo $directions; ?></textarea></div></fieldset>