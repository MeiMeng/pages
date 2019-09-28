/**
 * Created by mengmei on 17/2/21.
 */
var WINDOW_WIDTH = 1030;
var WINDOW_HEIGHT = 600;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 0;

/*var endTime = new Date(2017,1,25,18,47,52); //截至时间2017年2月23日18点47分52秒
endTime = new Date(new Date().getTime() + 2*3600*1000); //未来2小时*/
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function(){
    var canvas = document.getElementById("canvas");
    var cxt = canvas.getContext("2d");

    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;

    MARGIN_TOP = Math.round(WINDOW_HEIGHT/9);
    RADIUS = Math.round(WINDOW_WIDTH/107)-1;
    if(WINDOW_WIDTH>1000){
        MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
        RADIUS = Math.round(WINDOW_WIDTH*4/5/107)-1;
    }

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(function(){
        render(cxt);
        update();
    },50);
}

//今天一共走过了多少秒
function getCurrentShowTimeSeconds(){
    var curTime = new Date();
    var ret = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds();
    return ret;
}

function update(){
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds/3600);
    var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds = parseInt(nextShowTimeSeconds%60);

    var curHours = parseInt(curShowTimeSeconds/3600);
    var curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60);
    var curSeconds = parseInt(curShowTimeSeconds%60);

    if(nextSeconds != curSeconds){
        if( parseInt(curHours/10) != parseInt(nextHours/10)){ //比较小时的十位上的数字
            addBalls( MARGIN_LEFT +0*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT+15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT+39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT+54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }
        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT+78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT+93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
}

function updateBalls(){
    for(var i=0; i<balls.length; i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - Math.abs(balls[i].vy)*0.75; //必须是向上的速度,所以对原先的速度取绝对值
        }
    }

    var cnt = 0;
    for(var i=0; i<balls.length; i++){
        if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH){ //在画面内
            balls[cnt++] = balls[i]; //将画面内的小球集中在数组的前面,遍历完后从cnt往后的小球就是不在画面内的
        }
    }

    while( balls.length > Math.min(300,cnt) ){ //取300和cnt中的最小值
        balls.pop(); //将数组末尾的小球删掉
    }

    //console.log(balls.length);
}

function addBalls( x , y , num ){
    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(), // 1.5 ~ 2.5 随机值
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4, // -4 或 4
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ] // colors[ 0 ~ 9 ]
                }
                balls.push( aBall )
            }
}

function render(cxt){
    cxt.clearRect(0,0, WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours = parseInt(curShowTimeSeconds/3600);
    var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds = parseInt(curShowTimeSeconds%60);
    var halfSeconds = parseInt(new Date().getTime()/500);

    //绘制时间
    renderDigit(MARGIN_LEFT + (2*7+1)*(RADIUS+1)*0 + (2*4+1)*(RADIUS+1)*0, MARGIN_TOP, parseInt(hours/10), cxt);
    renderDigit(MARGIN_LEFT + (2*7+1)*(RADIUS+1)*1 + (2*4+1)*(RADIUS+1)*0, MARGIN_TOP, parseInt(hours%10), cxt);
    if( halfSeconds%2 == 0 ){
        renderDigit(MARGIN_LEFT + (2*7+1)*(RADIUS+1)*2 + (2*4+1)*(RADIUS+1)*0, MARGIN_TOP, 10, cxt);
    }
    renderDigit(MARGIN_LEFT + (2*7+1)*(RADIUS+1)*2 + (2*4+1)*(RADIUS+1)*1, MARGIN_TOP, parseInt(minutes/10), cxt);
    renderDigit(MARGIN_LEFT + (2*7+1)*(RADIUS+1)*3 + (2*4+1)*(RADIUS+1)*1, MARGIN_TOP, parseInt(minutes%10), cxt);
    if( halfSeconds%2 == 0 ) {
        renderDigit(MARGIN_LEFT + (2 * 7 + 1) * (RADIUS + 1) * 4 + (2 * 4 + 1) * (RADIUS + 1) * 1, MARGIN_TOP, 10, cxt);
    }
    renderDigit(MARGIN_LEFT + (2*7+1)*(RADIUS+1)*4 + (2*4+1)*(RADIUS+1)*2, MARGIN_TOP, parseInt(seconds/10), cxt);
    renderDigit(MARGIN_LEFT + (2*7+1)*(RADIUS+1)*5 + (2*4+1)*(RADIUS+1)*2, MARGIN_TOP, parseInt(seconds%10), cxt);

    //绘制小球
    for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fillStyle=balls[i].color;
        cxt.fill();
    }
}

function renderDigit(x,y, num, cxt){
    cxt.fillStyle = "rgb(0,102,153)";
    for(var i=0; i<digit[num].length; i++){
        for(var j=0; j<digit[num][i].length; j++){
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc(x+(RADIUS+1)+(j*2*(RADIUS+1)),y+(RADIUS+1)+(i*2*(RADIUS+1)),RADIUS, 0,2*Math.PI, false);
                cxt.fill();
            }
        }
    }
}


