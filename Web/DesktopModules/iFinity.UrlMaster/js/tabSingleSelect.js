/* tabSingleSelect.js
   js script for handling a ajax tab single select control 
   bchapman may 2010
   mods
   bchapman 12/3/11 Include search function (782)
   bchapman 25/06/11 allow setting of external control to selected tabid
*/
var registeredControls = [{}]; //empty json array
var ifty_tss_delay = (function() { var timer = 0; return function(callback, ms) { clearTimeout(timer); timer = setTimeout(callback, ms); }; })();
var ifty_tss = function () {
    return {
        //registerControl : run on page load and remembers control containerId and ajaxHandler Path,
        //as well as hooking the events
        registerControl: function (strAjaxHandler, strContainerId, blnAutoPostback, strTabIdFieldId) {
            var control = { ajaxHandler: strAjaxHandler, containerId: strContainerId, autoPostback: blnAutoPostback, tabIdFieldId: strTabIdFieldId };
            registeredControls.push(control);
            ifty_tss.hookControlEvents(control);
        },
        //reHookAllEvents : run through all registered control and re-hook the events
        reHookAllEvents: function () {
            //loop through the registered controls
            for (var i = 0; i < registeredControls.length; i++) {
                ifty_tss.hookControlEvents(registeredControls[i]);
            }
        },
        //hookControlEvents : setups jQuery event handlers for the various controls in the page list.
        hookControlEvents: function (control) {
            //listbox select and change / keypress
            var lstTabsId = control.containerId + '_lstTabs';
            var changeHandler = function () {
                ifty_tss.setSelTabId(this, control.containerId, control.tabIdFieldId);
                if (control.autoPostback == "True") {
                    var dollarCtlId = ifty_tss.idWithDollars(control.containerId, 'lstTabs');
                    //call asp.net postback control function
                    __doPostBack(dollarCtlId, '');
                }
            }
            jQuery('#' + lstTabsId).change(changeHandler).keypress(changeHandler);

            //first link
            jQuery('#' + control.containerId + '_hlFirst').click(function () {
                ifty_tss.showPage(control.ajaxHandler, control.containerId, "first");
                return false;
            });
            //prev link
            jQuery('#' + control.containerId + '_hlPrev').click(function () {
                ifty_tss.showPage(control.ajaxHandler, control.containerId, "prev");
                return false;
            });
            //next link
            jQuery('#' + control.containerId + '_hlNext').click(function () {
                ifty_tss.showPage(control.ajaxHandler, control.containerId, "next");
                return false;
            });
            //last link
            jQuery('#' + control.containerId + '_hlLast').click(function () {
                ifty_tss.showPage(control.ajaxHandler, control.containerId, "last");
                return false;
            });
            //782 : new search function
            //search link
            jQuery('#' + control.containerId + '_hlSearch').click(function () {
                ifty_tss.showPage(control.ajaxHandler, control.containerId, "search");
                return false;
            });
            //press enter on search box
            jQuery('#' + control.containerId + '_txtSearchString').bind('keydown', function (e) {
                var code = e.keyCode || e.which;
                if (code == 13) //enter 
                {
                    e.preventDefault();
                    ifty_tss.showPage(control.ajaxHandler, control.containerId, "search");
                    return false;
                }
                else {
                    //all other keystrokes
                    ifty_tss_delay(function () {
                        ifty_tss.showPage(control.ajaxHandler, control.containerId, "search");
                    }, 700);
                }
            });
        },
        //showPage : main function for displaying the list of tabs
        showPage: function (ajaxHandler, containerId, pagerVal, listbox) {
            //prepare the modal overlay
            var tabsContainerId = containerId + '_tabsContainer';
            var src = jQuery('.tss_loadingImg').attr('src');
            //make the overlay, well, overlay
            jQuery('#' + tabsContainerId).block({
                message: '<img src="' + src + '" alt=".....">',
                css: { cursor: 'wait', border: '2px solid #efefef', backgroundColor: 'white' },
                overlayCSS: { backgroundColor: 'white', opacity: 0.6 }
            });

            //find the options configured for this tabs list instance
            var options = ifty_tss.getPagingOptions(containerId);
            var listbox = jQuery('#' + containerId + '_lstTabs')[0];
            //get the json data for the paging 
            var data;
            jQuery.getJSON(ajaxHandler, { page: +options.curPage.toString(), pager: pagerVal, pageSize: options.pageSize, showAdmin: options.showAdmin, showHost: options.showHost, showDeleted: options.showDeleted, showExpired: options.showExpired, pages: options.numPages, portalid: options.portalid, search: options.search }
            , function (data) {
                //iterate the collection and add the items
                ifty_tss.buildList(data, listbox, options.selTabId);
                //set the current to the result
                options.curPage = data.page;
                options.numPages = data.numPages;
                //save the options data back
                ifty_tss.saveOptions(options, containerId);
                //set the label (page x of y)
                var lblPages = jQuery('#' + containerId + '_lblPages');
                lblPages.html(data.page.toString() + '/' + data.numPages.toString());
            });

            //remove the modal overlay
            jQuery('#' + tabsContainerId).unblock();
        },
        //list control functions
        addItemToList: function (listbox, text, value, isSelected) {
            //adds an item to a listbox
            var item = document.createElement("option");
            item.text = text;
            item.value = value;
            if (isSelected)
                item.selected = 'selected';
            listbox.options.add(item);
        },
        clearList: function (listbox) {
            //removes all items from a listbox
            listbox.options.length = 0;
        },
        buildList: function (data, listbox, selTabId) {
            //clear the listbox
            ifty_tss.clearList(listbox);
            for (var i = 0; i < data.tabs.length; i++) {
                var tab = data.tabs[i];
                var isSelected = (selTabId == tab.tabid);
                ifty_tss.addItemToList(listbox, tab.tabname, tab.tabid, isSelected);
            }
        },
        setSelTabId: function (lstTabs, containerId, tabIdFieldId) {
            //set the selected tab
            var options = ifty_tss.getPagingOptions(containerId);
            var selIndex = lstTabs.options.selectedIndex;
            if (tabIdFieldId != '') {
                //look for field
                var hiddenFieldjQ = jQuery('#' + tabIdFieldId);
            }
            if (selIndex > -1) {
                var selTabId = lstTabs.options[selIndex].value
                options.selTabId = selTabId;
                ifty_tss.saveOptions(options, containerId);
                if (hiddenFieldjQ.length) {
                    //exists, so set value to selTabId
                    var pageName = lstTabs.options[selIndex].text;
                    pageName = pageName.replace(/\.\.\./g, '');//replace leading ... characters
                    hiddenFieldjQ.val(selTabId + ':' + pageName).change();
                }
            }
            else {
                //no selection
                if (hiddenFieldjQ.length) {
                    //exists, so set value to selTabId
                    hiddenFieldjQ.val(-1 + ':');
                }
            }
        },
        //getPagingOptions : retrives the current options from the hidden field in the control
        getPagingOptions: function (containerId) {
            var options = jQuery('#' + containerId + '_hdnOptions').val();
            var optionsArr = options.split(':', 10);
            var optionData = { 'selTabId': optionsArr[0], 'pageSize': optionsArr[1], 'showAdmin': optionsArr[2], 'showHost': optionsArr[3], 'showDeleted': optionsArr[4], 'showExpired': optionsArr[5], 'numPages': optionsArr[6], 'curPage': optionsArr[7], 'portalid': optionsArr[8], 'search': optionsArr[9] };
            //overwrite the search data with the value from the search box, if it exists
            var searchVal = jQuery('#' + containerId + '_txtSearchString').val();
            if (optionData.search != searchVal)
                optionData.search = searchVal;
            return optionData;
        },
        //saveOptions : saves the current options back into the hidden field in the control
        saveOptions: function (optionData, containerId) {
            //writes the options back to the hidden field
            var data = optionData.selTabId.toString() + ':' + optionData.pageSize.toString() + ':' + optionData.showAdmin.toString() + ':' + optionData.showHost.toString() + ':' + optionData.showDeleted.toString() + ':' + optionData.showExpired + ':' + optionData.numPages + ':' + optionData.curPage.toString() + ':' + optionData.portalid.toString() + ':' + optionData.search;
            var options = jQuery('#' + containerId + '_hdnOptions');
            options.val(data); //save back to hidden field
        },
        idWithDollars: function (containerid, id) {
            var id = containerid + '_' + id;
            var did = id.replace(/_/gi, '$');
            return did;
        }
    };
} ();