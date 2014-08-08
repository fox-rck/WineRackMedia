$(document).ready(function () {
    //    $('.contact-form .label').css("display", "none");
    //$('input', ".thebox").customInput();
    //Set variables for watermarks
    var txtName = "Name";
    var txtEmail = "Email Address";
    var txtPhone = "Phone Number";
    var ddlCallTime = "";
    //var txtMessage = "How can we help you? Anything we should know?";


    //Set Watermark for Name

    $('.contact-form .field').each(function () {
        $(this).addClass("lightText")
 .val(getfield(this))
        // onfocus action
.focus(function () {
    if ($(this).val() == getfield(this)) {
        $(this).removeClass("lightText").val("");
    }
    // focus lost action
}).blur(function () {
    if ($(this).val().trim() == "" || $(this).val().trim() == getfield(this)) {
        $(this).val(getfield(this)).addClass("lightText");
    }
});
    });

    function getfield(x) {
        if ($(x).hasClass("txtName")) {
            return txtName;
        }
        else if ($(x).hasClass("txtEmail")) {
            return txtEmail;
        }
        else if ($(x).hasClass("txtPhone")) {
            return txtPhone;
        }
        else if ($(x).hasClass("ddlCallTime")) {
            return ddlCallTime;
        }
    }

    /*
    $('.button_submit .button').click(function (e) {
    if ($("#preferphone").is(":checked")) {
    $(".preferphonecheck").val("true");
    } else {
    $(".preferphonecheck").val("false");
    }

    //        if ($('.contact-form .txtPhone').val() === phonetxt || $('.contact-form .txtPhone').val().trim() == "") {

    //            $('.contact-form .txtPhone').val("");
    //            e.preventDefault();
    //        }
    //        if ($('.contact-form .txtEmail').val() === emailtxt || $('.contact-form .txtEmail').val().trim() == "") {
    //            e.preventDefault();

    //            $('.contact-form .txtEmail').val("");
    //        }
    //        if ($('.contact-form .txtName').val() === nametxt || $('.contact-form .txtName').val().trim() == "") {
    //            e.preventDefault();

    //            $('.contact-form .txtName').val("");
    //        }
    });*/
});