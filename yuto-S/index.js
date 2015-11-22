$(function(){
    
    //Ballのインスタンスを格納
    var ball;
    
    var interval;
    
    
    //重量加速度
    var g = 0.08;
    
    //速度
    var v = 0;
    
    //衝突係数
    var k = 0.8;
    
    //画面の下端
    var bottomY;
    
    var init = function(){
        
        //画面の下端を設定
        bottomY = $(window).height() - $(".ball").height()*.5;
        
        //Ballインスタンスを作成
        ball = Ball($(".ball"));
        
        //初期座標を設定
        ball.x = $(window).width()*0.5;
        ball.y = 50;
        
        //座標を画面表示に反映
        ball.updatePosition();
        
        //画面に表示
        ball.show();
        
        //アニメーション開始
        startAnime();
    };
    
    
    var startAnime = function(){
        interval = setInterval(onTimer,15);
    };
    
    
    var stopAnime = function(){
        clearInterval(interval);
    };
    
    
    var onTimer = function(){
        
        //速度に加速度を加算
        v += g;
        
        //X座標に速度を加算
        ball.y += v;
        
        if(ball.y > bottomY){
            ball.y = bottomY - (ball.y - bottomY)*k;
            v = -v * k;
        }
        
        
        //座標を画面表示に反映
        ball.updatePosition();
        
    };
    
    
    var Ball = function($elm){
        var instance = {x: 0, y: 0};
        instance.updatePosition = function(){
            var translate = "translate3d(" + instance.x + "px, " + instance.y + "px, 0)";
            $elm.css({
                "transform": translate,
                "-webkit-transform": translate,
                "-ms-transform": translate,
                "-o-transform": translate
            });
        };
        instance.show = function(){
            $elm.show();
        };
        return instance;
    };
    
    init();
});