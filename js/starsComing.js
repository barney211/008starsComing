var fillColor='#D17BD4';
var centerX=150;
var centerY=250;

var canvas=document.getElementById('starsGraph')
var ctx=canvas.getContext('2d');

ctx.fillStyle=fillColor;


get60stars();
//随机生成60个星星 并进行绘制的函数
function get60stars(){
    var starsArray=[];
    for(var i=0;i<130;i++){
        var obj={};
        var x=Math.ceil(Math.random()*(250-50)+50);
        var y=Math.ceil(Math.random()*(400-100)+100);
        obj.x=x;
        obj.y=y;
        starsArray.push(obj)
    }

    for(var j=0;j<starsArray.length;j++){
        drawStarComing(starsArray[j].x,starsArray[j].y,10,30)
    }
}


//绘制单颗星星飞来效果的  函数
function drawStarComing(startX1,startY1,startWidth1,endWidth1) {

    var startX=startX1;
    var startY=startY1;
    var startWidth=startWidth1;
    var endWidth=endWidth1;

    var img=new Image();
    img.src='./img/star.png';
    img.onload=function(){
        ctx.drawImage(img,startX,startY,startWidth,startWidth)
    }

   // ctx.fillRect(startX,startY,startWidth,startWidth);   //使用简单的矩形
    //计算出星星最后位置的坐标
    var finalX=(endWidth/startWidth)*(startX-centerX)+centerX;  //重点
    var finalY=(endWidth/startWidth)*(startY-centerY)+centerY;  //重点
   // console.log(finalX,finalY)
    var rangeX=finalX-startX;
    var rangeY=finalY-startY;
    var stepX=rangeX/10;
    var stepY=rangeY/10;
    var stepW=(endWidth-startWidth)/10;

    var originalX=startX; //用于记录最初坐标
    var originalY=startY;
    var originalW=startWidth;

    if(finalX>=startX){
        var isLess=true;//用于记录finalX是否大于startX
    }else{
        var isLess=false;//用于记录finalX是否大于startX
    }




    function drawStars(){
        ctx.clearRect(startX-1,startY-1,startWidth+2,startWidth+2);  //避免清除不掉不完全的问题
        startX+=stepX;
        startY+=stepY;
        startWidth+=stepW;

        if(isLess){
            if(startX>finalX){
                startX=originalX;
                startY=originalY;
                startWidth=originalW;
            }
        }else{
            if(startX<finalX){
                startX=originalX;
                startY=originalY;
                startWidth=originalW;
            }
        }


        ctx.drawImage(img,startX,startY,startWidth,startWidth)
       // ctx.fillRect(startX,startY,startWidth,startWidth) //使用简单的矩形

    }

    var timer=setInterval(function () {
        drawStars();
    },100)

}