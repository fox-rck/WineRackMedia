$(window).load(function () {
    //   $('.sitelogo').fadeIn(1000);
    //    $("#menu").fadeIn(1000);
});
$(document).ready(function () {
    var isiPad = navigator.userAgent.match(/iPad/i) != null;
    var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
    if (!isiPhone && !isiPad) {
        $(document).elegantLoad({ mainElements: $('body').get(), fadeOutOnLinkClick: Modernizr.touch ? false : true, elegantLoadTypekit: false });
    }
    $("#dnn_HeroSlides .Normal > div:first-child").show();
    // $('.sitelogo,#menu').css("display", "none");
    //$(".sitelogo img").css("width", "610px");


    if (isiPad) {
        windowwidth = (isiPad) ? ($(window).width() + 40) : ($(window).width());
        $("#hero, #footer").width(windowwidth);
    }
    $('#dnn_HeroSlides .Normal').each(function () {
        $("#dnn_HeroSlides").after('<div class="imgSelectNav"><div class="imgSelect imgSelect0"></div></div><div class="clear"></div>');
        $("#dnn_HeroSlides .Normal").cycle({
            fx: 'fade',
            speed: '1000',
            timeout: 5000,
            slideResize: 0,
            pager: '.imgSelect0',
            pagerAnchorBuilder: function (idx, slide) {
                return '<a href="#"></a>';
            },
            after: function (currSlideElement, nextSlideElement, options, forwardFlag) {
                if ($(nextSlideElement).attr("data-init")) {
                    var functString = $(nextSlideElement).attr("data-init");
                    if (functString.indexOf("flyIn") >= 0) {
                        flyin();
                      //  $("#dnn_HeroSlides .Normal").cycle("pause");
                    }
                }
            },
            before: function (currSlideElement, nextSlideElement, options, forwardFlag) {
                if ($(nextSlideElement).attr("data-init")) {
                    var functString = $(nextSlideElement).attr("data-init");
                    if (functString.indexOf("flyIn") >= 0) {
                        $(".phrase").removeClass("fadeIn");
                       
                    }
                }
            }

        });
        function flyin(x) {
            var rand = 0;
            $(".phrase").each(function (x) {
                rand = getRandomArbitrary(0, 1000);
                var that = this;
                setShow(that, rand);
             
            });
        }
        function setShow(x,rand) {
            window.setTimeout(function () {
                $(x).addClass("fadeIn");
            }, rand);
        }
        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        $("#dnn_HeroSlides .Normal").touchwipe({
            wipeLeft: function () { $("#dnn_HeroSlides  .Normal").cycle("prev"); },
            wipeRight: function () { $("#dnn_HeroSlides  .Normal").cycle("next"); },
            min_move_x: 20,
            min_move_y: 20,
            preventDefaultEvents: false
        });
        $(".member,.affil_icon a").click(function (e) {
            e.preventDefault();
            var isiPad = navigator.userAgent.match(/iPad/i) != null;
            windowwidth = (isiPad) ? ($(window).width() + 0) : ($(window).width());
            $("#mask").css({ "height": ($("#footer").offset().top + $("#footer").height()), "width": (windowwidth) });
            $("#popupcontent").html("<div class='close'>|X| close</div>" + $(".info", this).html()).css("top", ($(window).scrollTop() + 200));
            $("#popupwrapper").addClass("open");
            $("#mask").fadeIn();
        });

        $(".expandable a").click(function (e) {
            e.preventDefault();
            var newheight = $(this).siblings(".more").height() + 40;
            if ($(this).hasClass("open")) {
                $(this).removeClass("open");
                $(this).siblings(".more").slideToggle(400);

            } else {
                $(this).addClass("open");
                $(this).siblings(".more").css({ "visibility": "visible", "display": "none", "position": "relative" });
                $(this).siblings(".more").slideToggle(400, function () { });
                //console.log(($("#content").height() + newheight +160) +" "+(originalfooter));

            }

        });


        $('.video a').magnificPopup({
            disableOn: 310,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
        $("#mask,.close").live("click", function (e) {
            e.preventDefault();
            $("#popupwrapper").removeClass("open");
            $("#mask").fadeOut();
        });
        var hash = window.location.hash.replace("#", "");
        if (hash) {

            $(window).scrollTop(($("." + hash).offset().top));
            // $("." + hash).trigger("click");
        } else {
            var hash = $(".expandablewrapper .expandable").eq(0).children("a").attr("href");
            if (hash)
                hash = hash.replace("#", "");
        }
        $("a." + hash).trigger("click");

        $(".radioselect input").removeAttr("checked");
        if (getParameterByName("dmo") == "y")
            $(".radioselect #reqdemo_yes").attr("checked", "true");
    });



    var name = "name";
    var company = "company";
    var phone = "telephone";
    var email = "email";
    var url = "your website url";
    var msg = "we'd love to hear how";
    $("#name").val(name).data("origval", name);
    $("#company").val(company).data("origval", company);
    $("#phone").val(phone).data("origval", phone);
    $("#email").val(email).data("origval", email);
    $("#url").val(url).data("origval", url);
    $("#message").val(msg).data("origval", msg);
    $(".right input,.right textarea").focus(function () {
        if ($(this).val().trim() == $(this).data("origval")) {
            $(this).val("");
        }

    });
    $(".right input,.right textarea").blur(function () {
        if ($(this).hasClass("required")) {
            if ($(this).val().trim() == "") {
                $(this).val($(this).data("origval"));
                $(this).siblings(".error").css("visibility", "visible");
            } else {
                $(this).siblings(".error").css("visibility", "hidden");
            }
            if ($(this).attr("id") == "email") {
                var isemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,4}$/.test($('#email').val());
                if (!isemail) {
                    $(this).siblings(".error").css("visibility", "visible");
                    $(this).val($(this).data("origval"));
                } else {
                    $('#email').siblings(".error").css("visibility", "hidden");
                }
            }
        }
    });
    $("#submit").click(function (e) {
        e.preventDefault();
        var isvalid = true;
        $(".right input,.right textarea").each(function () {
            if ($(this).hasClass("required")) {
                if ($(this).val().trim() != "" && $(this).val().trim() != $(this).data("origval")) {
                    $(this).siblings(".error").css("visibility", "hidden");
                    var isemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,4}$/.test($('#email').val());
                    if (!isemail) {
                        $('#email').siblings(".error").css("visibility", "visible");
                        isvalid = false;
                    } else {
                        $('#email').siblings(".error").css("visibility", "hidden");
                    }
                } else {
                    $(this).siblings(".error").css("visibility", "visible");
                    isvalid = false;
                }
            }
        });

        if (isvalid) {
            $(".form").fadeOut(200, function () {
                $(".waiting").fadeIn(200);
            });
            var existweb = ($("#no").is(":selected")) ? "no" : "yes";
            var reqdemo = ($("#reqdemo_no").is(":selected")) ? "no" : "yes";
            $.ajax({
                type: "POST",
                url: "/ContactForm.asmx/SendEmail",
                data: '{"name":"' + $('#name').val() + '","company":"' + $('#company').val() + '","phone":"' + $('#phone').val() + '","formemail":"' + $('#email').val() + '","existweb":"' + existweb + '","req_demo":"' + reqdemo + '","url":"' + $('#url').val() + '","formmessage":"' + $('#message').val() + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    var returnval = msg.d;
                    var responsemessage = '';
                    if (returnval) {
                        responsemessage = "<h1>Thanks for reaching out to us!<br/> We will respond back as soon as possible.</h1>";
                    } else {
                        responsemessage = "<h1>The contact form is Not available at this time.</h1>";
                    }
                    $('.page-contact .right').html(responsemessage);
                }
            });
        }
    });
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}