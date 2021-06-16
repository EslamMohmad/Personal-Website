//set max-width to parent-sections
$(function () {
    function mainWidth() {
        let remainWidth = $(window).innerWidth() - $(".parent .nav-bar").outerWidth();
        $(".parent .parnet-sections").css("width",remainWidth)
        console.log(remainWidth)
    }
    mainWidth()
    $(window).resize(function () {
        mainWidth()
    })
})