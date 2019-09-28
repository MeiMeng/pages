/**
 * Created by mengmei on 17/11/13.
 */


$(function () {
    $("#mobileNavBtn").click(function () {
        $("#mobileNavBac").css("transform", "translateX(0)");
    });

    $("#closeMobileNavBtn").click(function () {
        $("#mobileNavBac").css("transform", "translateX(-100%)");
    });


    $("#nav li").each(function (i,v) {
        $(this).hover(function (){
            $(".secondNavUl:eq("+i+")").show();
        },function (){
            $(".secondNavUl:eq("+i+")").hide();
        });
    });


});

