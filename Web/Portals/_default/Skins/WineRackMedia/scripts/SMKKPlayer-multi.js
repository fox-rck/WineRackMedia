(function ($) {

    $.fn.forceRedraw = function (brutal) {

        //this fix works for most browsers. it has the same effect as el.className = el.className.
        $(this).addClass('forceRedraw').removeClass('forceRedraw');

        //sometimes for absolute positioned elements the above fix does not work.
        //there's still a "brutal" way to force a redraw by changing the padding.
        if (brutal) {
            var paddingLeft = $(this).css('padding-left');
            var parsedPaddingLeft = parseInt(paddingLeft, 10);
            $(this).css('padding-left', ++parsedPaddingLeft);

            //give it some time to redraw
            window.setTimeout($.proxy(function () {
                //change it back
                $(this).css('padding-left', paddingLeft);
            }, this), 1);
        }

        return this;

    }

})(jQuery);

var ytplayer;
var SJMPlayer = Object();
var firstTimeVideo = true;


_SJMPlayerOnOpenList = [];
_SJMPlayerOnCloseList = [];

SJMPlayer.youtubeLink = null;

SJMPlayer.onOpen = function (fn) {
    _SJMPlayerOnOpenList.push(fn);
}

SJMPlayer.onClose = function (fn) {
    _SJMPlayerOnCloseList.push(fn);
}

SJMPlayer.close = function () {
    $("#dialog").animate({
        height: "0px"
    }, 1000, function () {
        $("#dialog").hide();

        var x = $("#dialog").html();
        $("#dialog").html(x);
        $("#dialog").removeClass("windowOpen");
        $("#dialog").addClass("windowClosed");


        $("#mask").fadeOut(1000, function () {
            $('#myytplayer').replaceWith('<div id="myytplayer"></div>');
            if (_SJMPlayerOnCloseList) {
                var fn, i = 0;
                while ((fn = _SJMPlayerOnCloseList[i++])) {
                    fn.call();
                }
            }
        });
    });
}

SJMPlayer.open = function () {

    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Set height and width to mask to fill up the whole screen
    $('#mask').css({ 'width': maskWidth, 'height': maskHeight });
    $('#mask').fadeTo(1000, 0.8, function () {

        var winH = $(window).height();
        var winW = $(window).width();

        $('#dialog').parent().detach().prependTo('body');

        //Set the popup window to center  
        $('#dialog').css('top', winH / 2 - (390 / 2));
        $('#dialog').css('left', winW / 2 - $('#dialog').width() / 2);

        //transition effect
        $('#dialog').show();

        if (navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/)) {
            $('#myytplayer').replaceWith('<div class="iframe-wrapper" id="myytplayer"><object width="640" height="390"><param name="movie" value="//www.youtube.com/v/' + SJMPlayer.youtubeLink + '?fs=1&amp;hl=en_US&amp;rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + SJMPlayer.youtubeLink + '?fs=1&amp;hl=en_US&amp;rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="390"></embed></object></div>');
            $('#dialog').css("position", "absolute");
            $('#dialog').css('top', $(window).scrollTop() + (winH - 390)/ 2);
        } else if ($.browser.mozilla) {
            $('#myytplayer').replaceWith('<div class="iframe-wrapper" style="display:none;" id="myytplayer"><iframe title="YouTube video player" class="youtube-player" type="text/html" width="640" height="390" src="//www.youtube.com/embed/' + SJMPlayer.youtubeLink + '?rel=0&autoplay=1" frameborder="0" allowFullScreen></iframe></div>');
        } else {
            $('#myytplayer').replaceWith('<div class="iframe-wrapper" id="myytplayer"><iframe title="YouTube video player" class="youtube-player" type="text/html" width="640" height="390" src="//www.youtube.com/embed/' + SJMPlayer.youtubeLink + '?rel=0&autoplay=1" frameborder="0" allowFullScreen></iframe></div>');
        }

        $('#myytplayer').load(function () {
            $(".iframe-wrapper").forceRedraw(true);
        })

        $('#dialog').animate({ height: "385px" }, 1000, function () {
            if ($.browser.mozilla) {
                $("#myytplayer").show();
            }
            $(this).removeClass("windowClosed");
            $(this).addClass("windowOpen");
            $("#mask").one('click', function (e) {
                //Cancel the link behavior
                e.preventDefault();
                SJMPlayer.close();
            });
            $('.iframe-wrapper').forceRedraw(true);
        });
    });

    if (_SJMPlayerOnOpenList) {
        var fn, i = 0;
        while ((fn = _SJMPlayerOnOpenList[i++])) {
            fn.call();
        }
    }
}

function onYouTubePlayerReady(playerId) {
    ytplayer = document.getElementById("myytplayer");
}

function getYouTubeIdFromLink(link) {
    var startPos = link.indexOf('v=') + 2;
    var endPos = link.indexOf('&', startPos);
    if (endPos == -1) { endPos = link.length }
    return link.substring(startPos, endPos);
}

$(document).ready(function () {

    $('body').prepend(
            '<div id="mask">' +
            '<div id="boxes">' +
            '<div id="dialog" class="windowClosed"><div id="closeButton"><a href="#" id="closeLink">Close X</a></div><div id="myytplayer">This video requires Adobe Flash player.  Click here to download Adobe Flash Player, then refresh this page to view this video.</div></div></div></div>'
            );

    //select all the a tag with name equal to modal  
//    $('.smkk-movie').click(function (e) {
//        //Cancel the link behavior  
//        e.preventDefault();
//        SJMPlayer.youtubeLink = getYouTubeIdFromLink($(this).attr('href'));
//        SJMPlayer.open();
//    });
    $('.smkk-movie').live('click', function (e) {
     
        e.preventDefault();
        SJMPlayer.youtubeLink = getYouTubeIdFromLink($(this).attr('href'));
        SJMPlayer.open();
    });

    $('a[id=closeLink]').live('click', function (e) {
        e.preventDefault();
        SJMPlayer.close();
    });
});  
