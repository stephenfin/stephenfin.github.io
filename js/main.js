jQuery(document).ready(function() {
    /* SVG Styling */
    /* From stackoverflow.com/q/11978995/ */
    /*
     * Replace all SVG images with inline SVG
     */
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
            
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
            
            // Replace image with new SVG
            $img.replaceWith($svg);
        });

    });

    /* SVG Fallback */
    /* From http://ohdoylerules.com/snippets/modernizr-svg-fallback-to-png */
    if (!Modernizr.svg) {
        // wrap this in a closure to not expose any conflicts
        (function() {
            // grab all images. getElementsByTagName works with IE5.5 and up
            var imgs = document.getElementsByTagName('img'),endsWithDotSvg = /.*\.svg$/,i = 0,l = imgs.length;
            // quick for loop
            for(; i < l; ++i) {
                if(imgs[i].src.match(endsWithDotSvg)) {
                    // replace the png suffix with the svg one
                    imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
                }
            }
        })();
    }
});
