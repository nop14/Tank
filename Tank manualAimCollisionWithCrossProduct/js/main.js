var SCREEN_WIDTH = 800;//スクリーン幅
var SCREEN_HEIGHT = 600;//スクリーン高
var X=100;//自機中心初期値
var Y=100;//自機中心初期値
var theta =0;//自機砲身角初期値
var phi =0;//自機車体角初期値
var keystate={};//キー情報保持配列
var map = new Map();//背景オブジェクト
var mytank=new myTank(X,Y,theta,phi);//自機オブジェクト
var enermytank=new enermyTank(200,450,0,0);
var objects=[map];
var bullets=[];//弾丸オブジェクト格納配列
var lastbullet=5;

//描画コンテキストの取得
var canvas = $('#sample1').get(0);
var context = canvas.getContext('2d');

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
    move();//自機の動作処理
    render();
}//フレームごとの処理をまとめたもの


function render(){
    //全体をクリア
    context.fillStyle = 'rgb(255,00,00)';
    context.clearRect(0,0,canvas.width,canvas.height);//1フレーム前の描画をリセット
    map.draw();
    mytank.draw();
    enermytank.move(mytank.x,mytank.y,mytank);
    enermytank.draw();
    for(var i=0;i<5;i++){
        if(bullets[i].f>0){
            compareBulletCollision(bullets[i],objects);
            bullets[i].draw();
            bullets[i].update();
        }else if(i==lastbullet && bullets[i].f==0){
            bullets[i].updateLastBullet();
        }
    }
    //以下デバック領域
    console.log(enermytank.m);
}//描画処理をまとめたもの

init();//ゲーム呼び出し