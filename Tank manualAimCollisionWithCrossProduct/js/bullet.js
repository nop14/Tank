class bullet{
    f=0;
    t=0;
    clock=0;
    c=[];

    constructor(){
        this.m=new Array(1);
        this.m[0]=new Array(4);
        for(var i=0;i<4;i++){
            this.m[0][i]=new Array(2);
            for(var j=0;j<2;j++){
                this.m[0][i][j]=-10;
            }
        }
    }
    init(x,y,t){
        this.x=x;
        this.y=y;
        this.t=t;
        this.clock=0;
        this.c=[this.x+100*Math.cos(this.t),this.y+100*Math.sin(this.t)];
    }
    collision(i){
        this.m[0][0][0]=this.c[0]-3*Math.cos(this.t)+2*Math.sin(this.t);
        this.m[0][0][1]=this.c[1]-3*Math.sin(this.t)-2*Math.cos(this.t);
        this.m[0][1][0]=this.c[0]+(3+i)*Math.cos(this.t)+2*Math.sin(this.t);
        this.m[0][1][1]=this.c[1]+(3+i)*Math.sin(this.t)-2*Math.cos(this.t);
        this.m[0][2][0]=this.c[0]+(3+i)*Math.cos(this.t)-2*Math.sin(this.t);
        this.m[0][2][1]=this.c[1]+(3+i)*Math.sin(this.t)+2*Math.cos(this.t);
        this.m[0][3][0]=this.c[0]-3*Math.cos(this.t)-2*Math.sin(this.t);
        this.m[0][3][1]=this.c[1]-3*Math.sin(this.t)+2*Math.cos(this.t);
    }
    update(){
        this.collision(0);
        this.c[0]+=20*Math.cos(this.t);
        this.c[1]+=20*Math.sin(this.t);
        this.clock+=1;
    }
    updateLastBullet(){
        this.clock+=1;
    }
    draw(){
        var tm=rot(this.c[0],this.c[1],0,0,-this.t);
        context.rotate(this.t);
        context.fillRect(tm[0]-3,tm[1]-2,7,5);
        context.rotate(-this.t);
    }
}