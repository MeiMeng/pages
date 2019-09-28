/**
 * Created by mengmei on 17/11/13.
 */

var canvas;
var context;
var width;
var height;
const perWidth = 2;
const gap = 1;
var arr;
var compareArr = new Array(3);
var Top_Down = true; //默认自顶向下

function setData(l, r, mergeIndex) {
    compareArr[0] = l;
    compareArr[1] = r;
    compareArr[2] = mergeIndex;
    fillAllRect(arr);
}

function l() {
    return compareArr[0];
}

function r() {
    return compareArr[1];
}

function mergeIndex() {
    return compareArr[2];
}


window.onload = function(){
    canvas = document.getElementById("insertSort");
    context = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
    console.log(width);

    //刷新随机数组
    refreshArray();

    //排序
    mergeSort_TD(arr);

    //点击按钮
    $("#arraySwitchBtn").click(function(){
        $(this).find(".switchLong").toggleClass("afterHalf");
        Top_Down = !Top_Down;

        //刷新随机数组
        refreshArray();

        //排序
        if( Top_Down == true ){
            mergeSort_TD(arr);
        }else{
            mergeSort_BU(arr);
        }

    });
}



//刷新随机数组
function refreshArray() {
    clearAllSleep(); //清楚之前所有等待
    var n = Math.floor(width/(perWidth+gap));
    console.log(n);
    arr = generateRandomArray(n, 1, height);
}


//重画所有矩形
function fillAllRect(arr){
    context.clearRect(0, 0, width, height);
    for(var i=0; i<arr.length; i++){
        if( i>=l() && i<=r() ){
            context.fillStyle = "#0080FF";
        }else{
            context.fillStyle = "grey";
        }
        if( i>=l() && i<=mergeIndex() ){
            context.fillStyle = "#ff153d";
        }
        context.fillRect(perWidth*i+gap*i, height-arr[i], perWidth, arr[i]);
    }
}


//生成随机数组
function generateRandomArray(n, randomL, randomR) {
    var a = new Array(n);

    for(var i=0; i<n; i++){
        var ran = Math.random()*(randomR - randomL + 1);
        a[i] = Math.floor(ran+randomL);
    }

    return a;
}


//打印数组
function printArray(arr){
    console.log("[");
    for(var i=0; i<arr.length; i++){
        if(i>0){
            console.log(", ");
        }
        console.log(arr[i]);
    }
    console.log("]");
}


//归并排序
function mergeSort_TD(arr){    //自顶向下 TOP-DOWN
    setData( -1, -1, -1 );

    __mergeSort( arr, 0, arr.length-1 );

    setData( 0, arr.length-1, arr.length-1 );
}

async function __mergeSort(arr, l, r){
    if( l >= r ) return;

    setData(l, r, -1);

    var mid = Math.floor((l+r)/2);

    await __mergeSort(arr, l, mid);
    await __mergeSort(arr, mid+1, r);
    if( arr[mid] > arr[mid+1] ){
        await __merge(arr, l, mid, r);
    }
}

async function __merge(arr, l, mid, r){
    var n = (r-l)+1;
    var aux = new Array(n);
    for(var i=l; i<=r; i++){
        aux[i-l] = arr[i];
    }
    var i = 0;          // aux [0, mid-l]
    var j = (mid-l)+1;  // aux [(mid-l)+1, r-l]
    for( var k=l; k<=r; k++ ){  //k是原数组arr的索引 [l, r]
        if( i > mid-l ){       // i超出中间位置时
            arr[k] = aux[j];
            j++;
        }else if( j > r-l ){   // j超出最大索引时
            arr[k] = aux[i];
            i++;
        }else if( aux[i] <= aux[j] ){
            arr[k] = aux[i];
            i++;
        }else{
            arr[k] = aux[j];
            j++;
        }

        setData(l, r, k);
        await sleep(50);
    }
}


async function mergeSort_BU(arr){  //自底向上 BOTTOM-UP
    setData( -1, -1, -1 );

    for(var size=1; size<=arr.length; size+=size){
        for(var i=0; i+size<arr.length; i+=2*size){
            if(arr[i+size-1] > arr[i+size]){
                var r = Math.min(i+2*size-1, arr.length-1);
                setData(i, r, -1);
                await __merge(arr, i, i+size-1, r);
            }
        }
    }

    setData( 0, arr.length-1, arr.length-1 );
}


function clearAllSleep() {
    for(var i=0; i<10000; i++){
        clearTimeout(i);
    }
}


//延时
function sleep(ms) {
    return new Promise(resolve=>{setTimeout(resolve,ms)});
}
/*function sleep(ms) {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('睡眠完毕');
        }, ms);
    });
}*/



