/**
 * Created by chenlu l on 2017/3/23 0023.
 */
//作用于全局

var canvas = document.createElement("canvas");
var mainInner=document.querySelector("#main .main-inner")
document.querySelector('#main').insertBefore(canvas,mainInner);
var ctx = canvas.getContext('2d');
canvas.width =canvas.parentNode.offsetWidth;
canvas.height =window.screen.height/2;
canvas.style.position="fixed";
// canvas.style.top=0;
// canvas.style.zIndex=1;

//如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();

//初始角度为0
var step = 0;
//定义三条不同波浪的颜色
var lines = ["rgba(255,136,84, 0.1)",
  "rgba(255,157,56, 0.1)",
  "rgba(252,209,164,0.1)"];

var lines_night=["rgba(0,222,255, 0.1)",
  "rgba(157,192,249, 0.1)",
  "rgba(0,168,255, 0.1)"];

function loop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  step++;
  //画3个不同颜色的矩形
  for(var j = lines.length - 1; j >= 0; j--) {

    ctx.fillStyle = lines[j];
    //每个矩形的角度都不同，每个之间相差45度
    var angle = (step+j*120)*Math.PI/180;
    var deltaHeight   = Math.sin(angle) * 50;
    var deltaHeightRight   = Math.cos(angle) *50;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2+deltaHeight);
    ctx.bezierCurveTo(canvas.width /2, canvas.height/2+deltaHeight-120, canvas.width / 2, canvas.height/2+deltaHeightRight-120, canvas.width, canvas.height/2+deltaHeightRight);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, canvas.height/2+deltaHeight);
    ctx.closePath();
    ctx.fill();
  }
  requestAnimFrame(loop);
}
loop();

var canvas2=document.createElement("canvas");
document.querySelector('#header').appendChild(canvas2);
canvas2.width =canvas.parentNode.offsetWidth/8;
canvas2.height=window.screen.height/4;
canvas2.style.position="fixed";
canvas2.style.top=0;
var ctx2 = canvas2.getContext('2d');

ctx2.fillStyle = "#fac07d";
ctx2.beginPath();
ctx2.arc(0, 0, 120, 0, 2 * Math.PI, true);
ctx2.closePath();
ctx2.fill();
ctx2.fillStyle = "#f2e8cf";
ctx2.beginPath();
ctx2.arc(0, 0, 100, 0, 2 * Math.PI, true);
ctx2.closePath();
ctx2.fill();
ctx2.fillStyle = "white";
ctx2.beginPath();
ctx2.arc(0, 0, 80, 0, 2 * Math.PI, true);
ctx2.closePath();
ctx2.fill();
canvas2.style.opacity=0.8;
