window.onload = function () {
  var loader = document.getElementsByClassName('loading')[0];
  var wrap = document.getElementById('main');
  loader.style.display = "none";
  wrap.style.display = "block";
  initData();
  waterfall("main","box");
  window.onscroll = function () {
    if (isNeedLoad()&&flag) {
      flag = false;
      addPicture(numofImg,10);
      waterfall("main","box");

    }
  }
  wrap.addEventListener("click",function (e) {
    e.stopPropagation();
    fullScreen(e);
  },false);
  document.onclick = function () {
  	var mask = document.getElementsByClassName('mask')[0];
  	var bg=document.getElementById('bg');
    mask.style.display = "none";
    bg.style.display="none";
    mask.removeChild(mask.firstChild);
  };
};

var flag = true;//判断是否加载完成

var numofImg=0;
var imgs = [];
for (var i = 0; i < 22; i++) {
  var img = new Image();
  img.src = 'img/' + i + '.jpg';
  imgs.push(img);
}

function initData() {
  addPicture(0,12);
}

function addPicture(start,number) {
  var wrap = document.getElementById('main');
  for (var i = start; i < start+number; i++) {
  	if(i>21){
  		var tip=document.createElement("p");
  		document.getElementsByTagName('body')[0].appendChild(tip);
  		tip.innerHTML="没有更多了<<";//还需改进
  	}
  	else{
		var newBox = document.createElement("div");
	    var newImage = document.createElement("div");
	    var img = new Image();
	    console.log(i);
	    img.src = imgs[i].src;
	    newImage.appendChild(img);
	    newImage.className = "pic";
	    newBox.appendChild(newImage);
	    newBox.className = "box";
	    wrap.appendChild(newBox);
	}	
}
  numofImg+=number;
}

function waterfall(parent,box) {
  //获取全部box
  var wrap = document.getElementById(parent);
  var boxs = document.getElementsByClassName(box);
  var screenW = document.documentElement.clientWidth;
  var boxW = boxs[0].offsetWidth;
  var cols = Math.floor(screenW / boxW);
  wrap.style.width = boxW * cols + "px";
  wrap.style.margin = "0 auto";
  var colHeight = [];
  for (var i = 0; i < boxs.length; i++) {
    if (i < cols) {
      colHeight.push(boxs[i].offsetHeight);
    }else {
      var minColH = Math.min.apply(null,colHeight);
      var minColHIndex = getIndex(colHeight,minColH);
      boxs[i].style.position = "absolute";
      boxs[i].style.top = minColH + "px";
      boxs[i].style.left = boxW * minColHIndex +"px";
      colHeight[minColHIndex] += boxs[i].offsetHeight;
    }
  }
  flag = true;
}

//获取高度最小的列号索引
function getIndex(arr,data) {
  for (var i in arr) {
    if (arr[i] == data) {
      return i;
    }
  }
}

function isNeedLoad() {
  var boxs = document.getElementsByClassName("box");
  var lastPicHeight = boxs[boxs.length - 1].offsetTop;
  var scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
  var screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
  var nowHeight = scrollHeight + screenHeight;
  return (lastPicHeight > nowHeight)? false : true;
}

function fullScreen(e) {
  var mask = document.getElementsByClassName('mask')[0];
  var bg=document.getElementById('bg');
  if(mask.firstChild)mask.removeChild(mask.firstChild);
  var target = e.target;
  var img = new Image();
  img.src = target.src;
  mask.appendChild(img);
  bg.style.display="block";
  mask.style.display = "block";
  
}



