/**
 * @file
 * @author xieyq on 2016/7/28.
 * @version 1.0.0
 */

/*
 * 设置页面的html的font-size的大小
 * */
function setHtmlSize() {
    var clientWidth = Math.max($(window).width(), 1280); //  client  width
    var	clientHeight = Math.max($(window).height(), 699); //  client  height
    var	htmlSize = Math.min(clientWidth * 20 / 1920, clientHeight * 20 / 1080);
    $("html").css({
        "font-size" : htmlSize
    });
}

setHtmlSize();
$(window).on("resize", function() {
    setHtmlSize();
});