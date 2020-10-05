class bullet{
    f=0;
    x=0;
    y=0;
    t=0;
    m=[];

    init(){
        this.m=[this.x+100*Math.cos(this.t),this.y+100*Math.sin(this.t)];
    }
    collision(){
        var temp=[]
        var sum=0;

        function te(){
            if(temp.data[0]+temp.data[1]+temp.data[2]==0){
                return 0;
            }else{
                return 1;
            }
        }

        if(this.m[0]<0 || this.m[0]>800 ||this.m[1] <0 || this.m[1]>600){
            this.f=0;
        }else{
            for(var j=0;j<10;j++){
                temp=context.getImageData(this.m[0]-(5-j)*Math.cos(this.t)+3*Math.sin(this.t),this.m[1]-(5-j)*Math.sin(this.t)-3*Math.cos(this.t),1,1);
                sum+=te();
            }
            for(var j=0;j<10;j++){
                temp=context.getImageData(this.m[0]-(5-j)*Math.cos(this.t)-3*Math.sin(this.t),this.m[1]-(5-j)*Math.sin(this.t)+3*Math.cos(this.t),1,1);
                sum+=te();
            }
            for(var j=0;j<4;j++){
                temp=context.getImageData(this.m[0]+11*Math.cos(this.t)-(2-j)*Math.sin(this.t),this.m[1]+11*Math.sin(this.t)+(2-j)*Math.cos(this.t),1,1);
                sum+=te();
            }
            if(sum!=0){
                this.f=0;
            }
        }
    }
    update(){
        this.m[0]+=20*Math.cos(this.t);
        this.m[1]+=20*Math.sin(this.t);
    }
    draw(){
        var tm=rot(this.m[0],this.m[1],0,0,-this.t);
        context.rotate(this.t);
        context.fillRect(tm[0]-3,tm[1]-2,10,4);
        context.rotate(-this.t);
    }
}