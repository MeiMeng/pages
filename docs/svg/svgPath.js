var S;
var groupCount;

var groups = new Array();
var lineArr = {
    lineLen:0,
    lineObj:null
};
var pathIndexs = new Array();


$(function(){
    S = Snap("#svg");
    groupCount = document.getElementById('svg').getElementsByClassName('group').length;

    startSVGPath();

    $("#g1").on('click', function(){
        startSVGPath();
    });
});


function clearPath() {
    for(var i=1; i<=groupCount; i++){
        var pathCount = document.getElementById('g'+i).getElementsByTagName('path').length;
        var lineArrs = new Array();
        for(var j=1; j<=pathCount; j++){
            var nowClass = '#g'+i+' .path'+j;
            var newline = lineArr;
            newline.lineObj = S.select(nowClass);
            newline.lineLen =  newline.lineObj.getTotalLength();
            newline.lineObj.attr({
                strokeDasharray:newline.lineLen,
                strokeDashoffset:newline.lineLen
            });
            lineArrs[j-1] = newline;
        }
        groups[i-1] = lineArrs; //存放路径对象lineArr的数组
        pathIndexs[i-1] = lineArrs.length; //存放每个组的路径对象lineArr的个数
    }
}

function startSVGPath() {
    clearPath();
    for(var m=0; m<groups.length; m++){
        program(m);
    }
}


function program(m) {
    var newline = lineArr;
    var n = groups[m].length-pathIndexs[m];
    var nowClass = '#g'+(+m+1)+' .path'+(n+1);
    newline.lineObj = S.select(nowClass);
    newline.lineLen = newline.lineObj.getTotalLength();

    var to = {strokeDashoffset: 0};
    var duration = newline.lineLen * 9; //笔画描绘速度
    var easing = mina.linear;
    //if(pathIndexs[m] == 21){ //最后一行,改变方式
        //duration = newline.lineLen * 11;
        //easing = mina.backout;
    //}

    newline.lineObj.animate(to, duration, easing, function () {
        pathIndexs[m]--;
        if (pathIndexs[m] > 0) {
            program(m); //描绘路径
        }
    });
}