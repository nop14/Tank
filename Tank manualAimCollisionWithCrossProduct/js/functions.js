function rot(x,y,n,m,t){
    var res=[(x-n)*Math.cos(t)-(y-m)*Math.sin(t)+n,(x-n)*Math.sin(t)+(y-m)*Math.cos(t)+m];
    return res;
}//(n,m)を中心とした回転による座標変換、角度t回転

function collision(obj1,obj2){
    var res=true;
    var count=0;
    
    for(var i=0;i<obj1.length;i++){
        for(var j=0;j<obj2.length;j++){
            for(var k=0;k<4;k++){
                for(var l=0;l<4;l++){
                    if(l==3){
                        if((obj1[i][0][0]-obj1[i][3][0])*(obj2[j][k][1]-obj1[i][3][1])-(obj2[j][k][0]-obj1[i][3][0])*(obj1[i][0][1]-obj1[i][3][1])>=0){
                            count+=1;
                        }
                    }else{
                        if((obj1[i][l+1][0]-obj1[i][l][0])*(obj2[j][k][1]-obj1[i][l][1])-(obj2[j][k][0]-obj1[i][l][0])*(obj1[i][l+1][1]-obj1[i][l][1])>=0){
                            count+=1;
                        }
                    }
                }
                if(count==4){
                    res=false;
                }
                count=0;
            }
        }
    }
    return res;
}//オブジェクト1,2のmであるobj1とobj2を渡してオブジェクト1,2の当たり判定をする

function bulletCollision(bullet,objm){
    var res=-1;
    for(var i=0;i<20;i++){
        bullet.collision(i);
        //console.log(bullet.m[0][1][0]);
        if(!(collision(objm,bullet.m))){
            res=i;
            break;
        }
    }
    return res;
}//弾丸のオブジェクトと比較対象のオブジェクトのmを受け取って当たってる場合は当たってる時のtを返し、そうでないときは-1を返す

function compareBulletCollision(bullet,objects){
    var comp=-1;
    var temp=0;
    for(var i=0;i<objects.length;i++){
        temp=bulletCollision(bullet,objects[i].m);
        if(temp>=0 && (comp==-1 || temp<comp)){
            comp=temp;
            bullet.f-=1;
            if((bullet.t >=0 && bullet.t <Math.PI/2) || (bullet.t >= Math.PI && bullet.t < 3*Math.PI/2)){
                bullet.x=bullet.m[0][1][0];
                bullet.y=bullet.m[0][1][1];
                bullet.t=2*Math.PI-bullet.t+2*objects[i].rads[Math.ceil(bullet.m[0][1][0])][Math.ceil(bullet.m[0][1][1])];
            }else{
                bullet.x=bullet.m[0][2][0];
                bullet.y=bullet.m[0][2][1];
                bullet.t=2*Math.PI-bullet.t+2*objects[i].rads[Math.ceil(bullet.m[0][2][0])][Math.ceil(bullet.m[0][2][1])];
            }
            
        }
    }
    //console.log(objects[comp]);
}

function move(){
    for(let k of ['w','s','d','a','k','j','l']){
        if(keystate[k]){
            if(k=='w'){
                mytank.collision(1,0,0);
                if(collision(mytank.m,map.m)&&collision(map.m,mytank.m)&&collision(mytank.m,enermytank.m)&&collision(enermytank.m,mytank.m)){
                    if(keystate['f']){
                        mytank.x+=Math.cos(mytank.p);
                        mytank.y+=Math.sin(mytank.p);
                    }
                    mytank.x+=Math.cos(mytank.p);
                    mytank.y+=Math.sin(mytank.p);
                }
            }else if(k=='s'){
                mytank.collision(-1,0,0);
                if(collision(mytank.m,map.m)&&collision(map.m,mytank.m)&&collision(mytank.m,enermytank.m)&&collision(enermytank.m,mytank.m)){
                    if(keystate['f']){
                        mytank.x-=Math.cos(mytank.p);
                        mytank.y-=Math.sin(mytank.p);
                    }
                    mytank.x-=Math.cos(mytank.p);
                    mytank.y-=Math.sin(mytank.p);     
                }          
            }else if(k=='d'){
                mytank.collision(0,0,Math.PI/180);
                if(collision(mytank.m,map.m)&&collision(map.m,mytank.m)&&collision(mytank.m,enermytank.m)&&collision(enermytank.m,mytank.m)){
                    mytank.p+=Math.PI/180;
                    mytank.p=mytank.p%(2*Math.PI);
                }
            }else if(k=='a'){
                mytank.collision(0,0,-Math.PI/180);
                if(collision(mytank.m,map.m)&&collision(map.m,mytank.m)&&collision(mytank.m,enermytank.m)&&collision(enermytank.m,mytank.m)){
                    mytank.p-=Math.PI/180;
                    mytank.p=mytank.p%(2*Math.PI);
                }
            }else if(k=='k'){
                mytank.collision(0,Math.PI/180,0);
                if(collision(mytank.m,map.m)&&collision(map.m,mytank.m)&&collision(mytank.m,enermytank.m)&&collision(enermytank.m,mytank.m)){
                    mytank.t+=Math.PI/90;
                    mytank.t=mytank.t%(2*Math.PI);
                }
            }else if(k=='j'){
                mytank.collision(0,-Math.PI/180,0);
                if(collision(mytank.m,map.m)&&collision(map.m,mytank.m)&&collision(mytank.m,enermytank.m)&&collision(enermytank.m,mytank.m)){
                    mytank.t-=Math.PI/90;
                    mytank.t=mytank.t%(2*Math.PI);
                }
            }else if(k=='l'){
                for(var i=0;i<5;i++){
                    if(bullets[i].f==0 && lastbullet!=5 && bullets[lastbullet].clock>10){
                        bullets[i].f=3;
                        bullets[i].init(mytank.x,mytank.y,mytank.t);
                        lastbullet=i;
                        break;
                    }else if(bullets[i].f==0 && lastbullet==5){
                        bullets[i].f=3;
                        bullets[i].init(mytank.x,mytank.y,mytank.t);
                        lastbullet=i;
                        break;
                    }
                }
            }
        }
    }
}//自機の動作処理