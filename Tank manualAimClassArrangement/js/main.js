var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var X=100;
var Y=100;
var theta =0;
var phi =0;
var keystate={};
var mytank=new myTank(X,Y,theta,phi);
var bullets=[];

//描画コンテキストの取得
var canvas = $('#sample1').get(0);
var context = canvas.getContext('2d');

function rot(x,y,n,m,t){
    var res=[(x-n)*Math.cos(t)-(y-m)*Math.sin(t)+n,(x-n)*Math.sin(t)+(y-m)*Math.cos(t)+m];
    return res;
}//(n,m)を中心とした回転による座標変換、角度t回転


function init(){
    canvas.width=SCREEN_WIDTH;
    canvas.height=SCREEN_HEIGHT;

    for(var i=0;i<5;i++){
        bullets[i]=new bullet();
    }
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
            if(k=='w' && mytank.front ==0){
                if(keystate['f']){
                    mytank.x+=Math.cos(mytank.p);
                    mytank.y+=Math.sin(mytank.p);
                }
                mytank.x+=Math.cos(mytank.p);
                mytank.y+=Math.sin(mytank.p);      
            }else if(k=='s' && mytank.back==0){
                if(keystate['f']){
                    mytank.x-=Math.cos(mytank.p);
                    mytank.y-=Math.sin(mytank.p);
                }
                mytank.x-=Math.cos(mytank.p);
                mytank.y-=Math.sin(mytank.p);               
            }
            else if(k=='d' && mytank.right ==0){
                mytank.p+=Math.PI/180;
                mytank.p=mytank.p%(2*Math.PI);
            }
            else if(k=='a' && mytank.left==0){
                mytank.p-=Math.PI/180;
                mytank.p=mytank.p%(2*Math.PI);
            }
            else if(k=='k' && mytank.hosin_right ==0){
                mytank.t+=Math.PI/90;
                mytank.t=mytank.t%(2*Math.PI);
            }
            else if(k=='j' && mytank.hosin_left==0){
                mytank.t-=Math.PI/90;
                mytank.t=mytank.t%(2*Math.PI);
            }
            else if(k=='l'){
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
            }
        }
    }
    render();
}


function render(){
    //全体をクリア
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle = 'rgb(255,00,00)';
    context.fillRect(300,400,50,50);
    context.fillRect(200,150,50,50);
    context.fillRect(700,500,50,50);
    context.fillRect(400,50,50,50);
    mytank.body();
    mytank.hosin();
    for(var i=0;i<5;i++){
        if(bullets[i].f==1){
            bullets[i].draw();
            bullets[i].update();
            bullets[i].collision();
        }
    }
    mytank.collision_front();
    mytank.hosin_collision_front();
    mytank.collision_back();
    mytank.hosin_collision_back();
    mytank.collision_left();
    mytank.hosin_collision_left();
    mytank.collision_right();
    mytank.hosin_collision_right();

    console.log(bullets);
}

init();