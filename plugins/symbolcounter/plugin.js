// Define a new CKEditor plugin named 'symbolcounter'.
CKEDITOR.plugins.add('symbolcounter', {
    init: function (editor) { // The init function is called when the plugin is initialized.
        
        // Add an event listener for when the CKEditor instance is fully ready.
        editor.on('instanceReady', function () {
            
            // Locate the textarea element associated with the CKEditor instance by its ID.
            var $textarea = $('#' + editor.name);
            
            // Create a new DOM element to display the character count.
            var $counter = $('<div class="character-count">Characters: <span>0</span></div>');
            
            // Insert the counter element immediately after the textarea in the DOM.
            $textarea.after($counter);

            // Function to calculate and update the character count.
            var updateCharacterCount = function () {
                // Retrieve the editor's content and remove any HTML tags.
                var text = editor.getData().replace(/<[^>]*>/g, ''); 

                // Decode any HTML entities in the content (e.g., &amp; -> &).
                text = $('<div>').html(text).text(); 

                // Count the number of characters in the plain text.
                var count = text.length;

                // Update the counter display with the new character count.
                $counter.find('span').text(count);
            };

            // Attach event listeners to the editor's DOM to update the count during user interactions.
            editor.on('contentDom', function () {
                editor.document.on('keyup', updateCharacterCount); // Update on keyup.
                editor.document.on('paste', updateCharacterCount); // Update on paste.
                editor.document.on('input', updateCharacterCount); // Update on input events.
            });

            // Also update the character count when the editor content changes programmatically.
            editor.on('change', updateCharacterCount);

            // Perform an initial character count to handle any preloaded content in the editor.
            updateCharacterCount();
        });
    }
});
