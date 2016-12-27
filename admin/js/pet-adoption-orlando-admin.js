(function( $ ) {
    'use strict';

    /**
     * All of the code for your admin-facing JavaScript source
     * should reside in this file.
     *
     * Note: It has been assumed you will write jQuery code here, so the
     * $ function reference has been prepared for usage within the scope
     * of this function.
     *
     * This enables you to define handlers, for when the DOM is ready:
     *
     * $(function() {
	 *
	 * });
     *
     * When the window is loaded:
     *
     * $( window ).load(function() {
	 *
	 * });
     *
     * ...and/or other possibilities.
     *
     * Ideally, it is not considered best practise to attach more than a
     * single DOM-ready or window-load handler for a particular page.
     * Although scripts in the WordPress core, Plugins and Themes may be
     * practising this, we should strive to set a better example in our own work.
     */
        // Set all variables to be used in scope
    var frame,
        $metaBox = $('#pet-adoption-settings'), // Your meta box id here
        $addImgLink = $metaBox.find('.image-preview-button--upload'),
        $delImgLink = $metaBox.find( '.image-preview-button--clear'),
        $imgPlaceholder = $metaBox.find( '.image-preview__placeholder'),
        $imgIdInput = $metaBox.find( '.image-preview__input' );

    // ADD IMAGE LINK
    $addImgLink.on( 'click', function( event ){

        event.preventDefault();

        // If the media frame already exists, reopen it.
        if ( frame ) {
            frame.open();
            return;
        }

        // Create a new media frame
        frame = wp.media({
            title: 'Select or Upload Media Of Your Chosen Persuasion',
            button: {
                text: 'Use this media'
            },
            multiple: false  // Set to true to allow multiple files to be selected
        });


        // When an image is selected in the media frame...
        frame.on( 'select', function() {

            // Get media attachment details from the frame state
            var attachment = frame.state().get('selection').first().toJSON();

            // Send the attachment URL to our custom image input field.
            $imgPlaceholder.css({
                'background-image': "url('"+attachment.url+"')"
            });

            // Send the attachment id to our hidden input
            $imgIdInput.val( attachment.id );

            // Hide the add image link
            // addImgLink.addClass( 'hidden' );

            // Unhide the remove image link
            // delImgLink.removeClass( 'hidden' );
        });

        // Finally, open the modal on click
        frame.open();
    });


    // DELETE IMAGE LINK
    $delImgLink.on( 'click', function( event ){

        event.preventDefault();

        // Clear out the preview image
        $imgPlaceholder.css({
            'background-image': ''
        });

        // Un-hide the add image link
        $addImgLink.removeClass( 'hidden' );

        // Hide the delete image link
        $delImgLink.addClass( 'hidden' );

        // Delete the image id from the hidden input
        $imgIdInput.val( '' );

    });

})( jQuery );
