var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var X=100;
var Y=100;
var theta =0;
var phi =0;
var keystate={};
var map = new Map();
var mytank=new myTank(X,Y,theta,phi);
var bullets=[];

//描画コンテキストの取得
var canvas = $('#sample1').get(0);
var context = canvas.getContext('2d');

function init(){
    canvas.width=SCREEN_WIDTH;
    canvas.height=SCREEN_HEIGHT;

    /*for(var i=0;i<5;i++){
        bullets[i]=new bullet();
    }*/
    requestAnimationFrame(update);
}//初期化処理

document.body.addEventListener('keydown',function(event){
    switch(event.key){
        case 'w':
            keystate.w=true;
            break;
        case 's':
            keystate.s=true;
            break;
        case 'a':
            keystate.a=true;
            break;
        case 'd':
            keystate.d=true;
            break;
        case 'f':
            keystate.f=true;
            break;
        case 'k':
            keystate.k=true;
            break;
        case 'j':
            keystate.j=true;
            break;
        case 'l':
            keystate.l=true;
            break;
    }
});
//キー入力検出(キーが押された際)
document.body.addEventListener('keyup',function(event){
    switch(event.key){
        case 'w':
            keystate.w=false;
            break;
        case 's':
            keystate.s=false;
            break;
        case 'a':
            keystate.a=false;
            break;
        case 'd':
            keystate.d=false;
            break;
        case 'f':
            keystate.f=false;
            break;
        case 'k':
            keystate.k=false;
            break;
        case 'j':
            keystate.j=false;
            break;
        case 'l':
            keystate.l=false;
            break;
    }
});
//キー入力検出(キーが解放された際)
function update(){
    //次回フレームの更新呼び出し
    requestAnimationFrame(update);
    for(let k of ['w','s','d','a','k','j','l']){
        if(keystate[k]){
            if(k=='w' && mytank.collision_forward(map.collisionMap)){
                if(keystate['f']){
                    mytank.x+=Math.cos(mytank.p);
                    mytank.y+=Math.sin(mytank.p);
                }
                mytank.x+=Math.cos(mytank.p);
                mytank.y+=Math.sin(mytank.p);      
            }else if(k=='s' && mytank.collision_back(map.collisionMap)){
                if(keystate['f']){
                    mytank.x-=Math.cos(mytank.p);
                    mytank.y-=Math.sin(mytank.p);
                }
                mytank.x-=Math.cos(mytank.p);
                mytank.y-=Math.sin(mytank.p);               
            }else if(k=='d' && mytank.collision_body_right(map.collisionMap)){
                mytank.p+=Math.PI/180;
                mytank.p=mytank.p%(2*Math.PI);
            }else if(k=='a' && mytank.collision_body_left(map.collisionMap)){
                mytank.p-=Math.PI/180;
                mytank.p=mytank.p%(2*Math.PI);
            }else if(k=='k' && mytank.collision_hosin_right(map.collisionMap)){
                mytank.t+=Math.PI/90;
                mytank.t=mytank.t%(2*Math.PI);
            }else if(k=='j' && mytank.collision_hosin_left(map.collisionMap)){
                mytank.t-=Math.PI/90;
                mytank.t=mytank.t%(2*Math.PI);
            }/*else if(k=='l'&&collision){
                for(var i=0;i<5;i++){
                    if(bullets[i].f==0){
                        bullets[i].f=1;
                        bullets[i].x=mytank.x;
                        bullets[i].y=mytank.y;
                        bullets[i].t=mytank.t;
                        bullets[i].init();
                        break;
                    }
                }
            }*/
            map.reset();
        }
    }
    render();
}


function render(){
    //全体をクリア
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle = 'rgb(255,00,00)';
    map.draw();
    mytank.body();
    mytank.hosin();
}

init();