class myTank{
    constructor(x,y,t,p){
        this.x=x;
        this.y=y;
        this.t=t;
        this.p=p;
        this.m=new Array(2);
        for(var i=0;i<2;i++){
            this.m[i]=new Array(4);
            for(var j=0;j<4;j++){
                this.m[i][j]=new Array(2);
                for(var k=0;k<2;k++){
                    this.m[i][j][k]=0;
                }
            }
        }
        this.collision(0,0,0);
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

    draw(){
        this.hosin();
        this.body();
    }//描画処理をまとめた関数


    collision(f,dt,dp){
        //車体の長方形
        this.m[0][0][0]=this.x+f*Math.cos(this.p+dp)-70*Math.cos(this.p+dp)+40*Math.sin(this.p+dp);
        this.m[0][0][1]=this.y+f*Math.sin(this.p+dp)-70*Math.sin(this.p+dp)-40*Math.cos(this.p+dp);
        this.m[0][1][0]=this.x+f*Math.cos(this.p+dp)+70*Math.cos(this.p+dp)+40*Math.sin(this.p+dp);
        this.m[0][1][1]=this.y+f*Math.sin(this.p+dp)+70*Math.sin(this.p+dp)-40*Math.cos(this.p+dp);
        this.m[0][2][0]=this.x+f*Math.cos(this.p+dp)+70*Math.cos(this.p+dp)-40*Math.sin(this.p+dp);
        this.m[0][2][1]=this.y+f*Math.sin(this.p+dp)+70*Math.sin(this.p+dp)+40*Math.cos(this.p+dp);
        this.m[0][3][0]=this.x+f*Math.cos(this.p+dp)-70*Math.cos(this.p+dp)-40*Math.sin(this.p+dp);
        this.m[0][3][1]=this.y+f*Math.sin(this.p+dp)-70*Math.sin(this.p+dp)+40*Math.cos(this.p+dp);
        //砲身の長方形
        this.m[1][0][0]=this.x+f*Math.cos(this.p+dp)+15*Math.cos(this.t+dt)+5*Math.sin(this.t+dt);
        this.m[1][0][1]=this.y+f*Math.sin(this.p+dp)+15*Math.sin(this.t+dt)-5*Math.cos(this.t+dt);
        this.m[1][1][0]=this.x+f*Math.cos(this.p+dp)+95*Math.cos(this.t+dt)+5*Math.sin(this.t+dt);
        this.m[1][1][1]=this.y+f*Math.sin(this.p+dp)+95*Math.sin(this.t+dt)-5*Math.cos(this.t+dt);
        this.m[1][2][0]=this.x+f*Math.cos(this.p+dp)+95*Math.cos(this.t+dt)-5*Math.sin(this.t+dt);
        this.m[1][2][1]=this.y+f*Math.sin(this.p+dp)+95*Math.sin(this.t+dt)+5*Math.cos(this.t+dt);
        this.m[1][3][0]=this.x+f*Math.cos(this.p+dp)+15*Math.cos(this.t+dt)-5*Math.sin(this.t+dt);
        this.m[1][3][1]=this.y+f*Math.sin(this.p+dp)+15*Math.sin(this.t+dt)+5*Math.cos(this.t+dt);
    }//f前進し、砲身がdt回転し、車体がdp回転した時の車体と砲身の長方形の8頂点の座標

}
