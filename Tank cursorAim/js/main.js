var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var X=100;
var Y=100;
var theta =0;
var phi =0;
var keystate={};
var front=0;
var back=0;
var left=0;
var right=0;
var hosin_left=0;
var hosin_right=0;

//描画コンテキストの取得
var canvas = $('#sample1').get(0);
var context = canvas.getContext('2d');

function rot(x,y,n,m,t){
    var res=[(x-n)*Math.cos(t)-(y-m)*Math.sin(t)+n,(x-n)*Math.sin(t)+(y-m)*Math.cos(t)+m];
    return res;
}//(n,m)を中心とした回転による座標変換、角度t回転

function hosin(x,y,t){
    context.beginPath();
    context.arc(x,y,30,0,2*Math.PI);
    context.stroke();
    context.rotate(t);
    context.strokeRect(x*Math.cos(t)+y*Math.sin(t)+15,-1*x*Math.sin(t)+y*Math.cos(t)-5,80,10);
    context.rotate(-t);
}//砲身の描画処理

function body(x,y,t){
    context.rotate(t);
    context.strokeRect(x*Math.cos(t)+y*Math.sin(t)-70,-1*x*Math.sin(t)+y*Math.cos(t)-40,140,80);
    context.rotate(-t);
}//車体の描画処理

function collision_front(x,y,t){
    var x1=x+70*Math.cos(t)+40*Math.sin(t);
    var y1=y+70*Math.sin(t)-40*Math.cos(t);
    var temp=[];
    var sum=0;

    function te(){
        if(temp.data[0]+temp.data[1]+temp.data[2]==0){
            return 0;
        }else{
            return 1;
        }
    }

    for(var i=0;i<80;i++){
        temp=context.getImageData(x1-i*Math.sin(t),y1+i*Math.cos(t),1,1);
        //temp=context.getImageData(301,401,1,1)
        //console.log(temp.data[0]);  
        sum+=te();
    }
    front=sum;
}//車体前面の当たり判定

function hosin_collision_front(x,y,t,p){
    var v =2*Math.atan((-14+Math.sqrt(259))/7);
    var w =2*Math.atan((-14+Math.sqrt(259))/9);
    var u=(t-p+2*Math.PI)%(2*Math.PI);
    var m=[];
    var temp=[];
    var sum=0;

    function te(){
        if(temp.data[0]+temp.data[1]+temp.data[2]==0){
            return 0;
        }else{
            return 1;
        }
    }
    if(u==0){
        for(var i=0;i<10;i++){
            temp=context.getImageData(x+95*Math.cos(t)+(5-i)*Math.sin(t),y+95*Math.sin(t)-(5-i)*Math.cos(t),1,1);
            sum+=te();
        }
    }else if(u>0 && u<=v){
        m=rot(x+70,y+70*Math.tan(u)-5/Math.cos(u),x,y,p);
        for(var i=0;i<95+5*Math.tan(u)-70/Math.tan(u);i++){
            temp=context.getImageData(m[0]+i*Math.cos(t)+1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
        for(var i=0;i<10;i++){
            temp=context.getImageData(x+95*Math.cos(t)+(5-i)*Math.sin(t)+1,y+95*Math.sin(t)-(5-i)*Math.cos(t),1,1);
            sum+=te();
        }
    }else if(u>v && u<Math.PI/2){
        m=rot(x+40/Math.tan(u)+5/Math.sin(u),y+40,x,y,p);
        for(var i=0;i<95+5*Math.tan(u)-10/(Math.sin(2*u))-40/Math.sin(u);i++){
            temp=context.getImageData(m[0]+i*Math.cos(t)+1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
        for(var i=0;i<10;i++){
            temp=context.getImageData(x+95*Math.cos(t)+(5-i)*Math.sin(t)+1,y+95*Math.sin(t)-(5-i)*Math.cos(t),1,1);
            sum+=te();
        }
    }else if(u==Math.PI/2){
        m=rot(x+5,y+40,X,Y,p);
        for(var i=0;i<55;i++){
            temp=context.getImageData(m[0]+i*Math.cos(t)+1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
    }else if(u>Math.PI/2 && u<Math.PI-w){
        m=rot(x+40/Math.tan(u)+5/Math.sin(u),y+40,x,y,p);
        for(var i=0;i<95+5*Math.tan(u)-10/(Math.sin(2*u))-40/Math.sin(u);i++){
            temp=context.getImageData(m[0]+i*Math.cos(t)+1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
    }else if(u>=Math.PI-w && u<Math.PI){
        m=rot(x-70,y-70*Math.tan(u)-5/Math.cos(u),x,y,p);
        
        for(var i=0;i<95+5*Math.tan(u)+70/Math.cos(u);i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)+1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
    
    }else if(u>Math.PI && u<=Math.PI+w){
        m=rot(x-70,y-70*Math.tan(u)+5/Math.cos(u),x,y,p);
        for(var i=0;i<95-5*Math.tan(u)+70/Math.cos(u);i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)+1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }      
    }else if(u>Math.PI+w && u<3*Math.PI/2){
        m=rot(x-40/Math.tan(u)-5/Math.sin(u),y-40,x,y,p);
        for(var i=0;i<95+5/Math.tan(u)+40/Math.sin(t);i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)+1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
    }else if(u==3*Math.PI/2){
        m=rot(x+5,y-40,x,y,p);
        for(var i=0;i<55;i++){
            temp=context.getImageData(m[0]+i*Math.cos(t)+1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
    }else if(u>3*Math.PI/2 && u<=2*Math.PI-v){
        m=rot(x-40/Math.tan(u)-5/Math.sin(u),y-40,x,y,p);
        for(var i=0;i<95+5/Math.tan(u)+40/Math.sin(t);i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)+1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
        for(var i=0;i<10;i++){
            temp=context.getImageData(x+95*Math.cos(t)-(5-i)*Math.sin(t)+1,y+95*Math.sin(t)+(5-i)*Math.cos(t),1,1);
            sum+=te();
        }
    }else{
        m=rot(x+70,y+70*Math.tan(u)+5/Math.cos(u),x,y,p);
        for(var i=0;i<95-5*Math.tan(u)-70/Math.cos(u);i++){
            temp=context.getImageData(m[0]+i*Math.cos(t)+1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
        for(var i=0;i<10;i++){
            temp=context.getImageData(x+95*Math.cos(t)-(5-i)*Math.sin(t)+1,y+95*Math.sin(t)+(5-i)*Math.cos(t),1,1);
            sum+=te();
        }
    }
    front+=sum;
}//砲身前面の当たり判定

function hosin_collision_back(x,y,t,p){
    var v =2*Math.atan((-14+Math.sqrt(259))/7);
    var w =2*Math.atan((-14+Math.sqrt(259))/9);
    var u=(t-p+2*Math.PI)%(2*Math.PI);
    var m=[];
    var temp=[];
    var sum=0;

    function te(){
        if(temp.data[0]+temp.data[1]+temp.data[2]==0){
            return 0;
        }else{
            return 1;
        }
    }
    if(u>0 && u<=w){
        m=rot(x+70,y+70*Math.tan(u)+5/Math.cos(u),x,y,p);
        for(var i=0;i<95-5*Math.tan(u)-70/Math.cos(u);i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)-1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
    }else if(u>w && u<Math.PI/2){
        m=rot(x+40/Math.tan(u)-5/Math.sin(u),y+40,x,y,p);
        for(var i=0;i<95+5/Math.tan(u)-40/Math.sin(u);i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)-1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
    }else if(u==Math.PI/2){
        m=rot(x-5,y+40,x,y,p);
        for(var i=0;i<55;i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)-1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }    
    }else if(u>Math.PI/2 && u<=Math.PI-v){
        m=rot(x+40/Math.tan(u)-5/Math.sin(u),y+40,x,y,p);
        for(var i=0;i<95+5/Math.tan(u)-40/Math.sin(u);i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)-1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
        for(var i=0;i<10;i++){
            temp=context.getImageData(x+95*Math.cos(t)-(5-i)*Math.sin(t)+i*Math.sin(t)-1,y+95*Math.sin(t)+(5-i)*Math.cos(t),1,1);
            sum+=te();
        }
    }else if(u>Math.PI-v && u<Math.PI){
        m=rot(x-70,y-70*Math.tan(u)+5/Math.cos(u),x,y,p);
        for(var i=0;i<95-5*Math.tan(u)+70/Math.cos(u);i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)-1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
        for(var i=0;i<10;i++){
            temp=context.getImageData(x+95*Math.cos(t)-(5-i)*Math.sin(t)+i*Math.sin(t)-1,y+95*Math.sin(t)+(5-i)*Math.cos(t),1,1);
            sum+=te();
        }
    }else if(u==Math.PI){
        for(var i=0;i<10;i++){
            temp=context.getImageData(x+95*Math.cos(t)-(5-i)*Math.sin(t)+i*Math.sin(t)-1,y+95*Math.sin(t)+(5-i)*Math.cos(t),1,1);
            sum+=te();
        }
    }else if(u>Math.PI && u<=Math.PI+v){
        m=rot(x-70,y-70*Math.tan(u)-5/Math.cos(u),x,y,p);
        for(var i=0;i<95+5*Math.tan(u)+70/Math.cos(u);i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)-1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
        for(var i=0;i<10;i++){
            temp=context.getImageData(x+95*Math.cos(t)-(5-i)*Math.sin(t)+i*Math.sin(t)-1,y+95*Math.sin(t)+(5-i)*Math.cos(t),1,1);
            sum+=te();
        }
    }else if(u>Math.PI+v && u<3*Math.PI/2){
        m=rot(x-40/Math.tan(u)+5/Math.sin(u),y-40,x,y,p);
        for(var i=0;i<95-5/Math.tan(u)+40/Math.sin(u);i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)-1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
        for(var i=0;i<10;i++){
            temp=context.getImageData(x+95*Math.cos(t)-(5-i)*Math.sin(t)+i*Math.sin(t)-1,y+95*Math.sin(t)+(5-i)*Math.cos(t),1,1);
            sum+=te();
        }
    }else if(u==3*Math.PI/2){
        m=rot(x-5,y-40,x,y,p);
        for(var i=0;i<55;i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)-1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
    }else if(u>3*Math.PI/2 && u<2*Math.PI-w){
        m=rot(x-40/Math.tan(u)+5/Math.sin(u),y-40,x,y,p);
        for(var i=0;i<95-5/Math.tan(u)+40/Math.sin(u);i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)-1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
    }else if(u>=2*Math.PI-w && u<2*Math.PI){
        m=rot(x+70,y+70*Math.tan(u)-5/Math.cos(u),x,y,p);
        for(var i=0;i<95+5*Math.tan(u)-70/Math.cos(u);i++){
            //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
            temp=context.getImageData(m[0]+i*Math.cos(t)-1,m[1]+i*Math.sin(t),1,1);
            sum+=te();
        }
    }
    back+=sum;
}//砲身背面の当たり判定

function collision_back(x,y,t){
    var x1=x-70*Math.cos(t)+40*Math.sin(t);
    var y1=y-70*Math.sin(t)-40*Math.cos(t);
    var temp=[];
    var sum=0;
    for(var i=0;i<80;i++){
        temp=context.getImageData(x1-i*Math.sin(t),y1+i*Math.cos(t),1,1);
        //temp=context.getImageData(301,401,1,1)
        //console.log(temp.data[0]);
        function te(){
            if(temp.data[0]+temp.data[1]+temp.data[2]==0){
                return 0;
            }else{
                return 1;
            }
        }
        sum+=te();
    }
    back=sum;
}//背面の当たり判定

function collision_left(x,y,t){
    
    var temp=[];
    var sum =0;
    function te(){
        if(temp.data[0]+temp.data[1]+temp.data[2]==0){
            return 0;
        }else{
            return 1;
        }
    }
    for(var i=0;i<70;i++){
        temp=context.getImageData(x+41*Math.cos(t-Math.PI/2)+i*Math.cos(t),y+41*Math.sin(t-Math.PI/2)+i*Math.sin(t),1,1);
        sum += te();
    }
    for(var i=0;i<70;i++){
        temp=context.getImageData(x+41*Math.cos(t+Math.PI/2)-i*Math.cos(t),y+41*Math.sin(t+Math.PI/2)-i*Math.sin(t),1,1);
        sum += te();
    }
    for(var i=0;i<40;i++){
        temp=context.getImageData(x+71*Math.cos(t)-i*Math.cos(t-Math.PI/2),y+71*Math.sin(t)-i*Math.sin(t-Math.PI/2),1,1);
        sum += te();
    }
    for(var i=0;i<40;i++){
        temp=context.getImageData(x-71*Math.cos(t)+i*Math.cos(t-Math.PI/2),y-71*Math.sin(t)-i*Math.sin(t-Math.PI/2),1,1);
        sum += te();
    }
    
    left=sum;
}//車体の左旋回の当たり判定

function hosin_collision_left(x,y,t){
    var temp=[];
    var sum =0;
    var m=[];
    function te(){
        if(temp.data[0]+temp.data[1]+temp.data[2]==0){
            return 0;
        }else{
            return 1;
        }
    }
    for(var i=0;i<80;i++){
        temp=context.getImageData(x+(15+i)*Math.cos(t)+6*Math.sin(t),y+(15+i)*Math.sin(t)-6*Math.cos(t),1,1);
        sum += te();
    }
    /*for(var i=0;i<10;i++){
        m=rot(x+95,y-5,x,y,t);
        temp=context.getImageData(m[0]-i*Math.sin(t),m[1]+i*Math.cos(t),1,1);
        sum += te();
    }*/
    hosin_left=sum;  
}

function hosin_collision_right(x,y,t){
    var temp=[];
    var sum =0;
    var m=[];
    function te(){
        if(temp.data[0]+temp.data[1]+temp.data[2]==0){
            return 0;
        }else{
            return 1;
        }
    }
    for(var i=0;i<80;i++){
        temp=context.getImageData(x+(15+i)*Math.cos(t)-6*Math.sin(t),y+(15+i)*Math.sin(t)+6*Math.cos(t),1,1);
        sum += te();
    }
    /*for(var i=0;i<10;i++){
        m=rot(x+95,y-5,x,y,t);
        temp=context.getImageData(m[0]-i*Math.sin(t),m[1]+i*Math.cos(t),1,1);
        sum += te();
    }*/
    hosin_right=sum;  
}

function collision_right(x,y,t){
    
    var temp=[];
    var sum =0;
    function te(){
        if(temp.data[0]+temp.data[1]+temp.data[2]==0){
            return 0;
        }else{
            return 1;
        }
    }
    for(var i=0;i<70;i++){
        temp=context.getImageData(x-41*Math.cos(t-Math.PI/2)+i*Math.cos(t),y-41*Math.sin(t-Math.PI/2)+i*Math.sin(t),1,1);
        sum += te();
    }
    for(var i=0;i<70;i++){
        temp=context.getImageData(x-41*Math.cos(t+Math.PI/2)-i*Math.cos(t),y-41*Math.sin(t+Math.PI/2)-i*Math.sin(t),1,1);
        sum += te();
    }
    for(var i=0;i<40;i++){
        temp=context.getImageData(x+71*Math.cos(t)+i*Math.cos(t-Math.PI/2),y+71*Math.sin(t)+i*Math.sin(t-Math.PI/2),1,1);
        sum += te();
    }
    for(var i=0;i<40;i++){
        temp=context.getImageData(x-71*Math.cos(t)-i*Math.cos(t-Math.PI/2),y-71*Math.sin(t)-i*Math.sin(t-Math.PI/2),1,1);
        sum += te();
    }
    right=sum;
}//車体の右旋回の当たり判定

function init(){
    canvas.width=SCREEN_WIDTH;
    canvas.height=SCREEN_HEIGHT;

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
    }
});
//キー入力検出(キーが解放された際)
function update(){
    //次回フレームの更新呼び出し
    requestAnimationFrame(update);
    for(let k of ['w','s','d','a']){
        if(keystate[k]){
            if(k=='w' && front ==0){
                if(keystate['f']){
                    X+=Math.cos(phi);
                    Y+=Math.sin(phi);
                }
                X+=Math.cos(phi);
                Y+=Math.sin(phi);      
            }else if(k=='s' && back==0){
                if(keystate['f']){
                    X-=Math.cos(phi);
                    Y-=Math.sin(phi);
                }
                X-=Math.cos(phi);
                Y-=Math.sin(phi);               
            }
            else if(k=='d' && right ==0){
                phi+=Math.PI/180;
                phi=phi%(2*Math.PI);
            }
            else if(k=='a' && left==0){
                phi-=Math.PI/180;
                phi=phi%(2*Math.PI);
            }
        }
    }
    render();
}

canvas.addEventListener('mousemove',function(event){
    if(event.offsetX-X != 0){
        if(event.offsetX-X >0){
            if(event.offsetY-Y > 0){
                if(theta>Math.atan((event.offsetY-Y)/(event.offsetX-X))){
                    if(hosin_left==0){
                        theta=Math.atan((event.offsetY-Y)/(event.offsetX-X));
                    }
                }else if(theta<Math.atan((event.offsetY-Y)/(event.offsetX-X))){
                    if(hosin_right==0){
                        theta=Math.atan((event.offsetY-Y)/(event.offsetX-X));
                    }
                }else if(theta==Math.atan((event.offsetY-Y)/(event.offsetX-X))){
                    theta=Math.atan((event.offsetY-Y)/(event.offsetX-X));
                }
            }else if(event.offsetY-Y ==0){
                if(theta>6){
                    if(hosin_right==0){
                        theta=2*Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))
                    }
                }else if(theta<1){
                    if(hosin_left==0){
                        theta=2*Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))
                    }
                }else if(theta==0){
                    theta=2*Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))
                }
                
            }else{
                if(theta>2*Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))){
                    if(hosin_left==0){
                        theta=2*Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))
                    }
                }else if(theta<2*Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))){
                    if(hosin_right==0){
                        theta=2*Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))
                    }
                }else if(theta==2*Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))){
                    theta=2*Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))
                }
                
            }
        }else{
            if(theta>Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))){
                if(hosin_left==0){
                    theta=Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))
                }
            }else if(theta<Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))){
                if(hosin_right==0){
                    theta=Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))
                }
            }else if(theta==Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))){
                theta=Math.PI+Math.atan((event.offsetY-Y)/(event.offsetX-X))
            }
        }
            
    }else{
        if(theta>0){
            theta=Math.PI/2
        }else{
            theta=3*Math.PI/2
        }
    }
});

function render(){
    //全体をクリア
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle = 'rgb(255,00,00)';
    context.fillRect(300,400,50,50);
    context.fillRect(200,150,50,50);
    context.fillRect(700,500,50,50);
    context.fillRect(400,50,50,50);
    body(X,Y,phi);
    hosin(X,Y,theta);
    collision_front(X,Y,phi);
    hosin_collision_front(X,Y,theta,phi);
    collision_back(X,Y,phi);
    hosin_collision_back(X,Y,theta,phi);
    collision_left(X,Y,phi);
    hosin_collision_left(X,Y,theta);
    collision_right(X,Y,phi);
    hosin_collision_right(X,Y,theta);
    //console.log(front);
    console.log("front,back,left,right:"+front+","+back+","+left+","+right);
}

init();