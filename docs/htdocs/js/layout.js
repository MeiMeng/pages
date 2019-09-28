/**
 * Created by mengmei on 17/2/23.
 */

//翻页
var curIndex;
var height;
var pageCount;
var isMobile = false;
$(function () {
    curIndex = 1;
    height = document.body.clientHeight;

    //调整箭头的位置
    $("#next").css("bottom",height/30);
    $("#prev").css("top",height/60);

    pageCount = $("#pageGroup .page").size();

    var u = navigator.userAgent;
    isMobile = u.indexOf('Android') > -1 || u.indexOf('iPhone') > -1  || u.indexOf('iPad') > -1;
});


function next(){
    if(curIndex==pageCount){
        return;
    }
    $("#pageGroup .page").each(function (i,e) {
        this.style.webkitTransform = "translateY(-"+(height*curIndex)+"px)";
    });
    if(!isMobile){
        document.getElementById("prev").style.display = "block";
    }
    curIndex++;
    if(curIndex==pageCount){
        document.getElementById("next").style.display = "none";
    }
}

function prev(){
    if(curIndex==1){
        return;
    }
    $("#pageGroup .page").each(function (i,e) {
        this.style.webkitTransform = "translateY(-"+(height*(curIndex-2))+"px)";
    });
    document.getElementById("next").style.display = "block";
    curIndex--;
    if(curIndex==1){
        document.getElementById("prev").style.display = "none";
    }
}



//滑动处理
function load() {
    var mybody = document.getElementsByTagName('body')[0];

    var startX, startY, moveEndX, moveEndY, X, Y;

    mybody.addEventListener('touchstart', function(e) {
        // e.preventDefault();
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, false);

    mybody.addEventListener('touchmove', function(e) {
        // e.preventDefault();
        moveEndX = e.changedTouches[0].clientX;
        moveEndY = e.changedTouches[0].clientY;
        X = moveEndX - startX;
        Y = moveEndY - startY;
        if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
            // alert("向下滑");
            e.preventDefault(); //阻止手机端默认滚动弹性
        } else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
            // alert("向上滑");
            e.preventDefault(); //阻止手机端默认滚动弹性
        }
    });

    mybody.addEventListener('touchend', function(e) {
        // e.preventDefault();
        moveEndX = e.changedTouches[0].clientX;
        moveEndY = e.changedTouches[0].clientY;
        X = moveEndX - startX;
        Y = moveEndY - startY;
        if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
            // alert("向下滑");
            prev();
        } else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
            // alert("向上滑");
            next();
        }
    });
}
window.addEventListener('load',load, false);
