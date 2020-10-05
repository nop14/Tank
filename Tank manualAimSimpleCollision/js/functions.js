function rot(x,y,n,m,t){
    var res=[(x-n)*Math.cos(t)-(y-m)*Math.sin(t)+n,(x-n)*Math.sin(t)+(y-m)*Math.cos(t)+m];
    return res;
}//(n,m)を中心とした回転による座標変換、角度t回転

function collisionMapDraw(x,y,dx,dy,t,k){
    var map=new Array(800);

    for(var i=0;i<800;i++){
        map[i]=new Array(600);
        for(var j=0;j<600;j++){
            map[i][j]=0;
        }
    }
    for(var i=0;i<dx+1;i++){
        for(var j=0;j<dy+1;j++){
            if(i==0 || i==dx || j==0 || j==dy){
                map[Math.ceil(x-(dx/2-i)*Math.cos(t)+(dy/2-j)*Math.sin(t))][Math.ceil(y-(dx/2-i)*Math.sin(t)-(dy/2-j)*Math.cos(t))]=k;
            }
        }
    }
    return map;
}//中心(x,y)幅dx+1高さdy+1角度t種類kの長方形のcollisionMapの作成

function collisionMapSum(map1,map2){
    var map=new Array(800);
    for(var i=0;i<800;i++){
        map[i]=new Array(600);
        for(var j=0;j<600;j++){
            map[i][j]=map1[i][j]+map2[i][j];
        }
    }
    return map;
}

function Collision(map){
    var res=true;
    outer:
    for(var i=0;i<800;i++){
        for(var j=0;j<600;j++){
            if(map[i][j]>=100){
                res=false;
                break outer;
            }
        }
    }
    return res;
}