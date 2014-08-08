/*
 *
 * Author: Mimi Flynn mimi at smkkstudios dot com
 *
 * */

/* jslint undef: true, sloppy: true, todo: true, vars: true, white: true */

//  import globals (in this case, just jQuery with the $)
//(function ($) {

    var ED = ED || {};

    ED.namespace = function (ns_string) {
        var parts = ns_string.split('.'), parent = ED, i;

        // strip redundant leading global
        if (parts[0] === "ED") {
            parts = parts.slice(1);
        }

        for (i = 0; i < parts.length; i += 1) {

            // create a property if it doesn't exist
            if (typeof parent[parts[i]] === "undefined") {
                parent[parts[i]] = {};
            }

            parent = parent[parts[i]];

        }
        return parent;
    };

    ED.namespace('ED.Sitewide');

    //  Utility methods
    ED.Sitewide = (function () {
        //  simple watermark
        var formWatermark = function (el, text) {

            var item = $(el);

            function setVal(text) {
                item.val(text);
            }

            //  set the watermark value to text
            $(el).each(function () {

                //  set the watermark value to text  
                setVal(text);

            }).focus(function () {

                //  set the watermark value to empty
                setVal('');

            }).focusout(function () {

                // watermark show or hide according to value input
                if (!$(this).val()) {

                    //  set the watermark value to text
                    setVal(text);

                } else {

                    return false;

                }
            });

        };

        return {
            formWatermark: formWatermark
        };

    } ());

    ED.namespace('ED.Home');

    //  Homepage specific code
    ED.Home = (function () {


        var init = function () {
        };

        return {

            init: init

        };

    } ());

    ED.namespace('ED.initSite');

    /*About Us Specific code*/
    ED.About = (function () {


        var init = function () {
            directpage();
            casestudy();
        };
        function directpage() {
            var directpage_obj = {};
            directpage_obj.urlArray = window.location.toString().split("/");
            switch (directpage_obj.urlArray[directpage_obj.urlArray.length - 1]) {
                case 'ediscovery-consultants':
                    $('#about_nav #edoxteam').parent().addClass("selected");
                    break;
                case 'join-edox':
                    $('#about_nav #edoxcareers').parent().addClass("selected");
                    break;
                case 'contact-edox':
                    $('#about_nav #contact').parent().addClass("selected");
                    break;
                default:
                    $('#about_nav li').first().addClass("selected");
                    break;

            }
        }
        function casestudy() {
            $("a", "#casestudy_nav").click(function (e) {
                e.preventDefault();
                var index = $(this).parent("li").index();
                $(".selected", "#casestudy_nav").removeClass("selected");
                $(this).parent("li").addClass("selected");
                switchtab(index);
            });

            if (window.location.toString().indexOf("ediscovery-case-studies") > -1) {
                console.log("case");
                var directpage_obj = {};
                directpage_obj.urlArray = window.location.toString().split("/");
                switch (directpage_obj.urlArray[directpage_obj.urlArray.length - 1]) {
                    case 'processing':
                        $('#casestudy_nav #processing').parent().addClass("selected");
                        switchtab(0);
                        break;
                    case 'hosted-review':
                        $('#casestudy_nav #hostedreview').parent().addClass("selected");
                        switchtab(1);
                        break;
                    case 'supporting-it':
                        $('#casestudy_nav #supportIT').parent().addClass("selected");
                        switchtab(2);
                        break;
                    case 'project-management':
                        $('#casestudy_nav #projMan').parent().addClass("selected");
                        switchtab(3);
                        break;
                    default:
                        $('#casestudy_nav li').first().addClass("selected");
                        switchtab(0);
                        break;

                }
            }

            function switchtab(x) {
                $(".casestudy:visible", "#edoxcasestudy_section").hide();
                $(".casestudy", "#edoxcasestudy_section").eq(x).show();

            }
        }
        return {

            init: init

        };

    } ());

    ED.namespace('ED.initSite');

    //  Initialize site
    ED.initSite = function () {
        //ED.Home.init();
        $(document).ready(function () {
           // $('#smakk-page-wrapper').fadeCssHover();
        });
    };

    /* Document Ready? Do this!
    * ------------------------------------------------------------------------ */
    $(document).ready(function () {

        ED.initSite();

    });

//} (jQuery));
