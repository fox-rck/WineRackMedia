$(document).ready(function () {

    function HoverOver() {
        $(this).addClass('hover');
        var subLevel = $(this).children(".subLevel,.subLevelRight");
        if (!$(subLevel).is(':visible')) {
           $(subLevel).fadeIn(200);
        }
    }

    function HoverOut() {
        $(this).removeClass('hover');
        var subLevel = $(this).children(".subLevel,.subLevelRight");
        if ($(subLevel).is(':visible')) {
           $(subLevel).fadeOut(200);
        }
    }

    var config = {
        sensitivity: 2,
        interval: 200,
        over: HoverOver,
        timeout: 500,
        out: HoverOut
    };

    $("#dnnMenuLeft .topLevel > li.haschild").hoverIntent(config);

    $(".subLevel li.haschild").hover(HoverOver, HoverOut);

});