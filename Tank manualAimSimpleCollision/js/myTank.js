class myTank{
    collisionMap=[];
    constructor(x,y,t,p){
        this.x=x;
        this.y=y;
        this.t=t;
        this.p=p;
    }

    hosin(){
        context.beginPath();
        context.arc(this.x,this.y,30,0,2*Math.PI);
        context.stroke();
        context.rotate(this.t);
        context.strokeRect(this.x*Math.cos(this.t)+this.y*Math.sin(this.t)+15,-1*this.x*Math.sin(this.t)+this.y*Math.cos(this.t)-5,81,11);
        context.rotate(-this.t);
    }//砲身の描画処理

    body(){
        context.rotate(this.p);
        context.strokeRect(this.x*Math.cos(this.p)+this.y*Math.sin(this.p)-70,-1*this.x*Math.sin(this.p)+this.y*Math.cos(this.p)-40,141,81);
        context.rotate(-this.p);
    }//車体の描画処理

    collision(Map){
        this.collisionMapBody=collisionMapDraw(this.x,this.y,140,80,this.p,50);
        this.collisionMapHosin=collisionMapDraw(this.x+55*Math.cos(this.t),this.y+55*Math.sin(this.t),80,10,this.t,50);
        var res = true;
        outer: for(var i=0;i<800;i++){
            for(var j=0;j<600;j++){
                if(this.collisionMapBody[i][j]==50 || this.collisionMapHosin[i][j]==50){
                    Map[i][j]+=50;
                    if(Map[i][j]>=100){
                        res = false;
                        break outer;
                    }
                }
            }
        }
        return res;
    }

    collision_forward(Map){
        this.collisionMapBody=collisionMapDraw(this.x+Math.cos(this.p),this.y+Math.sin(this.p),140,80,this.p,50);
        this.collisionMapHosin=collisionMapDraw(this.x+Math.cos(this.p)+55*Math.cos(this.t),this.y+Math.sin(this.p)+55*Math.sin(this.t),80,10,this.t,50);
        var res = true;
        outer: for(var i=0;i<800;i++){
            for(var j=0;j<600;j++){
                if(this.collisionMapBody[i][j]==50 || this.collisionMapHosin[i][j]==50){
                    Map[i][j]+=50;
                    if(Map[i][j]>=100){
                        res = false;
                        break outer;
                    }
                }
            }
        }
        return res;
    }

    collision_back(Map){
        this.collisionMapBody=collisionMapDraw(this.x-Math.cos(this.p),this.y-Math.sin(this.p),140,80,this.p,50);
        this.collisionMapHosin=collisionMapDraw(this.x-Math.cos(this.p)+55*Math.cos(this.t),this.y-Math.sin(this.p)+55*Math.sin(this.t),80,10,this.t,50);
        var res = true;
        outer: for(var i=0;i<800;i++){
            for(var j=0;j<600;j++){
                if(this.collisionMapBody[i][j]==50 || this.collisionMapHosin[i][j]==50){
                    Map[i][j]+=50;
                    if(Map[i][j]>=100){
                        res = false;
                        break outer;
                    }
                }
            }
        }
        return res;
    }

    collision_body_right(Map){
        this.collisionMapBody=collisionMapDraw(this.x,this.y,140,80,this.p+Math.PI/180,50);
        this.collisionMapHosin=collisionMapDraw(this.x+55*Math.cos(this.t),this.y+55*Math.sin(this.t),80,10,this.t,50);
        var res = true;
        outer: for(var i=0;i<800;i++){
            for(var j=0;j<600;j++){
                if(this.collisionMapBody[i][j]==50 || this.collisionMapHosin[i][j]==50){
                    Map[i][j]+=50;
                    if(Map[i][j]>=100){
                        res = false;
                        break outer;
                    }
                }
            }
        }
        return res;
    }

    collision_body_left(Map){
        this.collisionMapBody=collisionMapDraw(this.x,this.y,140,80,this.p-Math.PI/180,50);
        this.collisionMapHosin=collisionMapDraw(this.x+55*Math.cos(this.t),this.y+55*Math.sin(this.t),80,10,this.t,50);
        var res = true;
        outer: for(var i=0;i<800;i++){
            for(var j=0;j<600;j++){
                if(this.collisionMapBody[i][j]==50 || this.collisionMapHosin[i][j]==50){
                    Map[i][j]+=50;
                    if(Map[i][j]>=100){
                        res = false;
                        break outer;
                    }
                }
            }
        }
        return res;
    }

    collision_hosin_right(Map){
        this.collisionMapBody=collisionMapDraw(this.x,this.y,140,80,this.p,50);
        this.collisionMapHosin=collisionMapDraw(this.x+55*Math.cos(this.t+Math.PI/180),this.y+55*Math.sin(this.t+Math.PI/180),80,10,this.t+Math.PI/180,50);
        var res = true;
        outer: for(var i=0;i<800;i++){
            for(var j=0;j<600;j++){
                if(this.collisionMapBody[i][j]==50 || this.collisionMapHosin[i][j]==50){
                    Map[i][j]+=50;
                    if(Map[i][j]>=100){
                        res = false;
                        break outer;
                    }
                }
            }
        }
        return res;
    }

    collision_hosin_left(Map){
        this.collisionMapBody=collisionMapDraw(this.x,this.y,140,80,this.p,50);
        this.collisionMapHosin=collisionMapDraw(this.x+55*Math.cos(this.t-Math.PI/180),this.y+55*Math.sin(this.t-Math.PI/180),80,10,this.t-Math.PI/180,50);
        var res = true;
        outer: for(var i=0;i<800;i++){
            for(var j=0;j<600;j++){
                if(this.collisionMapBody[i][j]==50 || this.collisionMapHosin[i][j]==50){
                    Map[i][j]+=50;
                    if(Map[i][j]>=100){
                        res = false;
                        break outer;
                    }
                }
            }
        }
        return res;
    }
}
