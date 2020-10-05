class Map{
    constructor(){
        this.reset();
    }
    reset(){
        this.collisionMap=new Array(800);
        for(var i=0;i<800;i++){
            this.collisionMap[i]=new Array(600);
            for(var j=0;j<600;j++){
                if(i==9 || i==790 || j==9 || j==590){
                    this.collisionMap[i][j]=99;
                }else if(((i>158 && i<541) && (j==159 || j==224)) || ((i==159 || i==540) && (j>158 && j<225))){
                    this.collisionMap[i][j]=99;
                }else{
                    this.collisionMap[i][j]=0;
                }
            }
        }
    }
    draw(){
        context.beginPath();
        context.strokeRect(9,9,782,582);
        context.strokeRect(159,159,382,66);

    }
}