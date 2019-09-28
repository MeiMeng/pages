/**
 * Created by mengmei on 17/11/13.
 */

var canvas;
var context;
var width;
var height;
var perWidth = 4;
var gap = 1;
var arr;
var rectColor = "#0080FF";
var sortedColor = "#81e7ff";
var compareArr = new Array(-1,-1,-1,-1);

function setData(sortedIndex, currentIndex, minIndex, compareIndex) {
    compareArr[0] = sortedIndex;
    compareArr[1] = currentIndex;
    compareArr[2] = minIndex;
    compareArr[3] = compareIndex;
    fillAllRect(arr);
}

function sortedIndex() {
    return compareArr[0];
}

function currentIndex() {
    return compareArr[1];
}

function minIndex() {
    return compareArr[2];
}

function compareIndex() {
    return compareArr[3];
}


window.onload = function(){
    canvas = document.getElementById("selectSort");
    context = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
    console.log(width);

    //刷新随机数组
    refreshRandom();

    //排序
    selectSort(arr);
}


//刷新随机数组
function refreshRandom() {
    var n = Math.floor(width/(perWidth+gap));
    console.log(n);
    arr = genarateRandomArray(n, 1, height);
    fillAllRect(arr);
}


//重画所有矩形
function fillAllRect(arr){
    context.clearRect(0, 0, width, height);
    for(var i=0; i<arr.length; i++){
        if(i<=sortedIndex()){
            context.fillStyle = sortedColor;
        }else if(i==currentIndex()){
            context.fillStyle = "orange";
        }else if(i==minIndex()){
            context.fillStyle = "purple";
        }else if(i==compareIndex()){
            context.fillStyle = "blue";
        }else{
            context.fillStyle = rectColor;
        }
        context.fillRect(perWidth*i+gap*i, height-arr[i], perWidth, arr[i]);
    }
}


//生成随机数组
function genarateRandomArray(n, randomL, randomR) {
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


//选择排序
//从索引0开始,从后面选最小的元素与当前元素交换
async function selectSort(arr){
    for(var i=0; i<arr.length; i++){
        var minIndex = i;

        setData(i-1, i, -1, -1);
        await sleep(30);

        for(var j=i; j<arr.length; j++){

            setData(i-1, i, minIndex, j);
            await sleep(30);

            if(arr[j] < arr[minIndex]){
                minIndex = j;

                setData(i-1, i, minIndex, -1);
                await sleep(30);
            }
        }
        swap(arr, i, minIndex);

        setData(i-1, minIndex, i, -1);
        await sleep(300);
    }

    setData(i, -1, -1, -1);
}



//交换数组元素位置
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}


//延时
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
