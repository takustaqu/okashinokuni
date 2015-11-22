$(function(){
    
    //Ball�̃C���X�^���X���i�[
    var ball;
    
    var interval;
    
    
    //�d�ʉ����x
    var g = 0.08;
    
    //���x
    var v = 0;
    
    //�ՓˌW��
    var k = 0.8;
    
    //��ʂ̉��[
    var bottomY;
    
    var init = function(){
        
        //��ʂ̉��[��ݒ�
        bottomY = $(window).height() - $(".ball").height()*.5;
        
        //Ball�C���X�^���X���쐬
        ball = Ball($(".ball"));
        
        //�������W��ݒ�
        ball.x = $(window).width()*0.5;
        ball.y = 50;
        
        //���W����ʕ\���ɔ��f
        ball.updatePosition();
        
        //��ʂɕ\��
        ball.show();
        
        //�A�j���[�V�����J�n
        startAnime();
    };
    
    
    var startAnime = function(){
        interval = setInterval(onTimer,15);
    };
    
    
    var stopAnime = function(){
        clearInterval(interval);
    };
    
    
    var onTimer = function(){
        
        //���x�ɉ����x�����Z
        v += g;
        
        //X���W�ɑ��x�����Z
        ball.y += v;
        
        if(ball.y > bottomY){
            ball.y = bottomY - (ball.y - bottomY)*k;
            v = -v * k;
        }
        
        
        //���W����ʕ\���ɔ��f
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