var img = new Array();
var cnt = 0;
var saibool = true;

const MAX = 6;

img[0] = new Image();
img[0].src = "images/img1.png";
img[1] = new Image();
img[1].src=  "images/img2.png"
img[2] = new Image();
img[2].src = "images/img1.png";
img[3] = new Image();
img[3].src=  "images/img2.png"
img[4] = new Image();
img[4].src = "images/img1.png";
img[5] = new Image();
img[5].src=  "images/img2.png"

$(function() {
	//クリック代用
	$('#btn').click(function(){
		if(saibool){
			
			//var g = setInterval(gravity, 10);
			saibool = false;
		}else{
			saibool = true;
		}
	});
	/*
	window.addEventListener("devicemotion", function(event) {
	    //加速度センサの3軸の値
	    var xa = event.acceleration.x;
	    var ya = event.acceleration.y;
	    var za = event.acceleration.z;
	     
	}, false);
	*/
	$('#btn').ready(function() {
		var count = setInterval(changeIMG,200);
	});

});

function changeIMG(){
  if(saibool){
	var val = Math.round( Math.random()*5);
	cnt = val;
	document.getElementById("gazo").src=img[cnt].src;
  }else{
	
  }
}
function moveIMG(){
	
}