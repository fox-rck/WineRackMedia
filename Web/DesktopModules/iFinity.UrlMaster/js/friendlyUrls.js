//------------------
//Friendly Urls js file
//Url Master 2.0 UI
//May 2010
//mods
//
//-------------------

//main jquery handler for page
jQuery(document).ready(function($){

    //main page loading function
    friendlyUrlsPageLoad();

});//end main jquery handler for page

function friendlyUrlsPageLoad()
{
    //onload actions
        jQuery("#tabs").tabs();
        jQuery("#tabs").bind('tabsshow', function(event, ui){
            switch (ui.index)
            {
                case 0://friendlyUrlSettings
                    var pageExtHandling = jQuery("[name$='$optPageExtensionUsage']:checked");
                    showPageExtensionHandling(pageExtHandling, false);
                    break;
                case 1://advancedSettings
                    showAdvancedSettings();
                    break;
                case 2:// regex settings
                    break;
                case 3://performance settings
                    break;
                case 4://testUrls 
                    showTestUrlSettings();
                    break;
            }
        });
        
        enableUpdatePanelHandler(); //keep tabs index when updatepanel does partial postback
          
        //space replacement option
        jQuery("[name$='$chkReplaceSpaces']").click(function()
            {
                //if checked, hide text box
                var tb = jQuery("[name$='$txtReplaceSpaceWith']")
                if (this.checked == true)
                    tb.show();
                else
                {
                    tb.hide('slow');
                    tb.val("");
                    }
            });
        
        
        //page extension handling
        jQuery("[name$='$optPageExtensionUsage']").click(function ()
        {
            var val = jQuery("[name$='$optPageExtensionUsage']:checked");
            showPageExtensionHandling(val, true);
        });
        
        
      
}

//global var for remembeing which tab we were on across postbacks
var selectedTabIndex=-1; var pageLoaded=0;
function enableUpdatePanelHandler()
{
    var prm = Sys.WebForms.PageRequestManager.getInstance();
    if (prm != null)
    {
        //register the end and begin request handler events
        prm.add_endRequest(EndRequestHandler);
        prm.add_beginRequest(BeginRequestHandler);
    }
}
/// begin request event handler - triggered by MS ajax scriptmanager
function BeginRequestHandler(sender, args) 
{
    if (pageLoaded == 0)
    {
        pageLoaded = 1;
        var tabs = jQuery("#tabs").tabs();
        selectedTabIndex = tabs.tabs('option', 'selected');
        pageLoaded = 2;
    }
} 
/// end request event handler - triggered by MS ajax scriptmanager
function EndRequestHandler(sender, args) 
{
    if (pageLoaded > 1)
    {
        var tabs = jQuery("#tabs").tabs();
        tabs.tabs('select', selectedTabIndex);
        friendlyUrlsPageLoad();//run the page load routine
        //re-hook tabSingleSelect events after postback
        if (selectedTabIndex == 4)
            ifty_tss.reHookAllEvents();
        if (selectedTabIndex == 4)
            showTestUrlSettings();
        pageLoaded = 0;//set back to initial state
    }
}

function showPageExtensionHandling(val, fromClick)
{
    var pageExt = jQuery("#pageExtension");
    var tb = jQuery("[name$='$txtPageExtension']");
    var tbVis = tb.is(":visible");
    switch (val.val())
    {
        case "Always":
            pageExt.show();
            if (tb.val()=="")
                tb.val(".aspx");
            break;
        case "Never":
            pageExt.hide('slow');
            tb.val("");
            if (fromClick)
                showPageExtensionWarning(val);
            break;
        case "PageOnly":
            pageExt.show();
            if (tb.val()=="")
                tb.val(".aspx");
            if (fromClick)
                showPageExtensionWarning(val);
            break;
    }
}
function showPageExtensionWarning(val) {
    //862: dnn6 changes to dialog
    jQuery('.pageExtDialog').dialog({ modal: true, dialogClass: 'umdialog', buttons: { "Ok": function () { jQuery(this).dialog("close"); } } });
    
}
function showDefaultRedirectWarning() {
    //862: dnn6 changes to dialog
    jQuery('.defaultRedirectDialog').dialog({ modal: true, dialogClass: 'umdialog', buttons: { "Ok": function () { jQuery(this).dialog("close"); } } });
    
}
function showAdvancedSettings()
{
    //setup dialog warning on click of checkbox
    jQuery("[name$='$chkRedirectDefaultPage']").click( function () 
    { 
        if (jQuery(this).is(':checked'))
            showDefaultRedirectWarning(); 
    });
}
function showTestUrlSettings()
{
    //set dummy link up
    jQuery('.copyToTestRewrite').attr('href',"#");
    //links up the buttons to copy text into the test url rewriting.
    jQuery('.copyToTestRewrite').click(function () {
        var label = jQuery(this).siblings('.friendlyUrlExample');
        //find friendly url result
        var example = label.html();
        jQuery("[name$='$txtTestRewrite']").val(example);
        return false;
    });
}

//ajax notification for safari, which doesn't notify upon load completion
if (typeof(Sys) !== 'undefined') Sys.Application.notifyScriptLoaded();