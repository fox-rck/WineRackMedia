/*
 *
 * Author: Mimi Flynn mimi at smkkstudios dot com
 *
 * */

/* jslint undef: true, sloppy: true, todo: true, vars: true, white: true */

//  import globals (in this case, just jQuery with the $)
(function ($) {

    var ED = ED || {};

    ED.namespace = function(ns_string) {
      var parts = ns_string.split('.'), parent = ED, i;

      // strip redundant leading global
      if (parts[0] === "ED") {
        parts = parts.slice(1);
      }

      for ( i = 0; i < parts.length; i += 1) {

        // create a property if it doesn't exist
        if ( typeof parent[parts[i]] === "undefined") {
          parent[parts[i]] = {};
        }

        parent = parent[parts[i]];

      }
      return parent;
    };

    ED.namespace('ED.Sitewide');

    //  Utility methods
    ED.Sitewide = ( function() {

        var cyclePagerBuilder = function(el) {

          //  get ID of parent element to create unique pager ID
          var elementID = $(el).parent().attr('id');

          return "<div class='controller'><nav id='" + elementID + "-cycle-pager' class='cycle-pager'></div>";

        };

        var featureCycle = function(el) {

          $(el).each(function() {

            //  get ID of parent element to point cycle to right pager
            var elementID = $(this).parent().attr('id');
            elementID = "#" + elementID + "-cycle-pager";

            //  make it cycle
            $(this).cycle({

              timeout : 10000,
              fx : 'fade',
              pager : elementID

            });

          });

        };

        //  initialize tabs at the bottom
        var featureTabs = function(el) {

          $(el).tabs();

          // fix the classes
          $(".tabs-bottom .ui-tabs-nav, .tabs-bottom .ui-tabs-nav > *").removeClass("ui-corner-all ui-corner-top").addClass("ui-corner-bottom");

          // move the nav to the bottom
          $(".tabs-bottom .ui-tabs-nav").appendTo(".tabs-bottom");

        };

        var contentTabs = function(el) {

          $(el).tabs();

        };

        //  Create animation function
        var animate = function(parent, el, animation) {

          //  animation dependent upon: http://daneden.me/animate/
          parent.find(el).addClass('animated ' + animation);

        };

        var heroAnimations = function() {

          var hero = $('.hero');

          animate(hero, '.content > *', 'fadeInLeft');

        };
        
        var linkHover = function() {
          
          var link = $('a'),
              speed = 100;
          
          link.hover(function(){
            
            $(this).stop().animate({opacity: 0.7}, speed);
            
          }, function(){
            
            $(this).stop().animate({opacity: 1.0}, speed);
            
          });
          
        };

        //  simple watermark
        var formWatermark = function(el, text) {
          
          var item = $(el);
          
          function setVal(text) {
            item.val(text);
          }

          //  set the watermark value to text
          $(el).each(function() {
          
            //  set the watermark value to text  
            setVal(text);
            
          }).focus(function() {

            //  set the watermark value to empty
            setVal('');

          }).focusout(function() {
            
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

          featureCycle : featureCycle,
          featureTabs : featureTabs,
          contentTabs : contentTabs,
          heroAnimations : heroAnimations,
          linkHover : linkHover,
          formWatermark : formWatermark

        };

      }());

    ED.namespace('ED.Home');

    //  Homepage specific code
    ED.Home = ( function() {

        //  import dependencies
        var featureCycle = ED.Sitewide.featureCycle, featureTabs = ED.Sitewide.featureTabs, contentTabs = ED.Sitewide.contentTabs, heroAnimations = ED.Sitewide.heroAnimations, formWatermark = ED.Sitewide.formWatermark, linkHover = ED.Sitewide.linkHover;

        var init = function() {

          featureCycle('.slider');
          featureTabs('.hero .tabs');
          //contentTabs('#about_nav');
          heroAnimations();
          //linkHover();
          
          //  set the watermarks for form elements
          formWatermark('#name', 'Name');
          formWatermark('#email', 'Email');
          formWatermark('#phone', 'Phone Number');

        };

        return {

          init : init

        };

      }());

    ED.namespace('ED.initSite');

    //  Initialize site
    ED.initSite = function() {

      ED.Home.init();

    };

    /* Document Ready? Do this!
     * ------------------------------------------------------------------------ */
    $(document).ready(function() {

      ED.initSite();

    });

  }(jQuery));
