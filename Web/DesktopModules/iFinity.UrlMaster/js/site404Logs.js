jQuery(document).ready(function($){
    var toggleMinus = jQuery('#minus').attr('src');
    var togglePlus = jQuery('#plus').attr('src');
    var firstTd = jQuery('.site404LogRow td:first-child');
    firstTd.prepend('<img src="' + togglePlus + '" alt="expand this section" />');
    //hide the detail rows
    jQuery('.site404LogDetailRow').hide();

    jQuery('img', firstTd).addClass('clickable').click(function() { 
        var toggleSrc = jQuery(this).attr('src');
        if ( toggleSrc == togglePlus ) 
        { 
            jQuery(this).attr('src', toggleMinus).parent().parent().next('.site404LogDetailRow').toggle();
        } 
        else
        { 
            jQuery(this).attr('src', togglePlus).parent().parent().next('.site404LogDetailRow').toggle();
        } 
    }) ;
    
});
