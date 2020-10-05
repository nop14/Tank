class Map{
    constructor(){
        this.m=new Array(5);
        for(var i=0;i<5;i++){
            this.m[i]=new Array(4);
            for(var j=0;j<4;j++){
                this.m[i][j]=new Array(2);
                for(var k=0;k<2;k++){
                    this.m[i][j][k]=0;
                }
            }
        }
        this.collision();
        this.rads=new Array(800);
        for(var i=0;i<800;i++){
            this.rads[i]=new Array(600);
            for(var j=0;j<600;j++){
                if((i<=9 || i>=790) && (j>9 && j<590)){
                    this.rads[i][j]=Math.PI/2;
                }else if(((i>195 && i<205) || (i>594 && i<604)) && (j>=9 && j<=324)){
                    this.rads[i][j]=Math.PI/2;
                }else{
                    this.rads[i][j]=0;
                }
            }
        }
    }
    collision(){
        //外枠1
        this.m[0][0][0]=0;
        this.m[0][0][1]=0;
        this.m[0][1][0]=9;
        this.m[0][1][1]=0;
        this.m[0][2][0]=9;
        this.m[0][2][1]=599;
        this.m[0][3][0]=0;
        this.m[0][3][1]=599;
        //外枠2
        this.m[1][0][0]=0;
        this.m[1][0][1]=0;
        this.m[1][1][0]=799;
        this.m[1][1][1]=0;
        this.m[1][2][0]=799;
        this.m[1][2][1]=9;
        this.m[1][3][0]=0;
        this.m[1][3][1]=9;
        //外枠3
        this.m[2][0][0]=790;
        this.m[2][0][1]=0;
        this.m[2][1][0]=799;
        this.m[2][1][1]=0;
        this.m[2][2][0]=799;
        this.m[2][2][1]=599;
        this.m[2][3][0]=790;
        this.m[2][3][1]=599;
        //外枠4
        this.m[3][0][0]=0;
        this.m[3][0][1]=590;
        this.m[3][1][0]=799;
        this.m[3][1][1]=590;
        this.m[3][2][0]=799;
        this.m[3][2][1]=599;
        this.m[3][3][0]=0;
        this.m[3][3][1]=599;
        //障害物1
        this.m[4][0][0]=200;
        this.m[4][0][1]=275;
        this.m[4][1][0]=599;
        this.m[4][1][1]=275;
        this.m[4][2][0]=599;
        this.m[4][2][1]=324;
        this.m[4][3][0]=200;
        this.m[4][3][1]=324;
    }//背景の長方形

    draw(){
        context.beginPath();
        context.strokeRect(9,9,782,582);
        context.strokeRect(200,275,400,50);
    }//背景の描画処理
}