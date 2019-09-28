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
var compareArr = new Array(-1,-1);
var randomArrayType = true; //默认随机数组

function setData(sortedIndex, currentIndex) {
    compareArr[0] = sortedIndex;
    compareArr[1] = currentIndex;
    fillAllRect(arr);
}

function sortedIndex() {
    return compareArr[0];
}

function currentIndex() {
    return compareArr[1];
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
    insertSort(arr);

    //点击按钮
    $("#arraySwitchBtn").click(function(){
        $(this).find(".switchLong").toggleClass("afterHalf");
        randomArrayType = !randomArrayType;

        //刷新随机数组
        refreshArray();

        //排序
        insertSort(arr);
    });
}



//刷新随机数组
function refreshArray() {
    clearAllSleep(); //清楚之前所有等待
    var n = Math.floor(width/(perWidth+gap));
    console.log(n);
    arr = generateRandomArray(n, 1, height);

    if(randomArrayType == false){ //如果不是随机的
        quickSort(arr); //排序

        //随机交换几个
        var swapTime = 2;
        for(var i=0; i<swapTime; i++){
            var a = Math.floor(Math.random()*n);
            var b = Math.floor(Math.random()*n);
            console.log(a+", "+b);
            swap(arr, a, b);
        }
    }
}


//重画所有矩形
function fillAllRect(arr){
    context.clearRect(0, 0, width, height);
    for(var i=0; i<arr.length; i++){
        if(i==currentIndex()){
            context.fillStyle = "deepskyblue";
        }else if(i<=sortedIndex()){
            context.fillStyle = "red";
        }else{
            context.fillStyle = "darkgray";
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


function quickSort(arr){
    for(var i=0; i<arr.length; i++){
        var minIndex = i;
        for(var j=i; j<arr.length; j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        swap(arr, i, minIndex);
    }
}


//插入排序
//从索引0开始,从后面选最小的元素与当前元素交换
async function insertSort(arr){
    setData(0, -1);
    for(var i=1; i<arr.length; i++){
        setData(i, i);
        await sleep(100);
        for(var j=i; j>0 && arr[j]<arr[j-1]; j--){
            swap(arr, j, j-1);
            setData(i, j-1);
            await sleep(50);
        }
        await sleep(50);
    }
    setData(arr.length, -1);
}


function clearAllSleep() {
    for(var i=0; i<5000; i++){
        clearTimeout(i);
    }
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
