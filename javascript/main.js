//set max-width to parent-sections
$(function () {
    function mainWidth() {
        const ele = $(".parent .nav-bar");
        let winWidth = $(window).innerWidth();
        let remainWidth = winWidth - $(".parent .nav-bar").outerWidth();
        if (winWidth <= 1200) {
            ele.addClass("active")
            $(".parent .parnet-sections").css("width",winWidth)
        } else {
            $(".parent .parnet-sections").css("width",remainWidth);
            ele.removeClass("active")
        }
    }
    mainWidth()
    $(window).resize(function () {
        mainWidth()
    })
})

//coloring web
//translate setting section
$(".parnet-sections .setting .icon").on("click", function () {
    const eleWidth = $(this).parent().outerWidth();
    if ($(this).hasClass("active")) {
        $(this).parent().animate({
            right: - eleWidth + "px"
        }).children(".icon").removeClass("active")
    } else {
        $(this).parent().animate({
            right:0
        }).children(".icon").addClass("active")
    }
})

const targetElemet = $(".parent .nav-bar .row ul");
$(".parnet-sections .setting .colors li").on("click", function () {
    $(".bgcolor-style." + $(this).attr("class")).css("background-color","var(--" + $(this).attr("class") + ")")
    $(".bgcolor-style.fas").css({
        "background-color":"white",
        "color":"var(--" + $(this).attr("class") + ")"
    })
    
    targetElemet.attr("class",$(this).attr("class")) //add class to parent of list [ul]
    $(".parent .nav-bar .row ul li.active")
    .attr("class","heading " + targetElemet.attr("class") + " active")

    //add color to any text
    $(".color-style").css("color","var(--" + $(this).attr("class") + ")")

    let THIcon = $(".parent .section-three .bord").attr("class","bord " + $(this).attr("class"))
    $(".parent .section-three .row .content").attr("class","content " + $(this).attr("class"))

    //sections-four ul li
    $(".parent .section-four .content .filter-list ul li").css("border-color","var(--"+ $(this).attr("class") + ")")
})

$(".parent .nav-bar .row ul li").on("click", function () {
    $(this).addClass("heading " + targetElemet.attr("class") + " active")
    .siblings().removeClass("" + targetElemet.attr("class") + " active")
})

//add classess
$(".bgcolor-style,.parent .nav-bar .fa-bars").each(function () {
    const colorArr = ["redColor","blueColor","OrangeColor","YellowColor","greenColor"];
    colorArr.map(e => {
        $(this).addClass(e)
    })
})

//switch between dark/light mode
$(".parnet-sections .input input").on("click", function () {
    $(".parent").attr("class","parent " + $(this).attr("class"))
})

//translate nav-bar section
$(".bgcolor-style.fas.fa-bars").on("click", function () {
    $(this).toggleClass("fa-times active");
    if ($(this).hasClass("active")) {
        $(".parent .nav-bar").addClass("translated")
    } else {
        $(".parent .nav-bar").removeClass("translated")
    }
})

//switch between sections
$(".parent .nav-bar .row ul li").on("click",function () {
    let ele = $("." + $(this).text());
    ele.css("z-index","9").animate({
        "left":"0%"
    },"fast").siblings(".section").css("z-index","8").delay(500).animate({
        "left":"100%"
    }, function () { ele.css("z-index","9") })
})

//section-four filter items 
$(".parent .section-four .content .filter-list ul li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active")
    let item = $(".bord." + $(this).text());
    const parent = $(".parent .section-four .content .grid").children()
    if ($(this).text() == "all") {
        parent.fadeIn()
    } else {
        parent.fadeOut()
        item.fadeIn()
    }
})