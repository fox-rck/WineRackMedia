$(document).ready(function () {
    //    $('.contact-form .label').css("display", "none");
    var txtName = "Name";
    var txtEmail = "Email Address";
    var txtPhone = "Phone Number";
    


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
       
    }
});