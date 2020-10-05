class myTank{
    front=0;
    back=0;
    left=0;
    right=0;
    hosin_left=0;
    hosin_right=0;

    constructor(x,y,t,p){
        this.x=x;
        this.y=y;
        this.t=t;
        this.p=p;
    }
//諸所で使われてるrotは巻き戻しで利用
    hosin(){
        context.beginPath();
        context.arc(this.x,this.y,30,0,2*Math.PI);
        context.stroke();
        context.rotate(this.t);
        context.strokeRect(this.x*Math.cos(this.t)+this.y*Math.sin(this.t)+15,-1*this.x*Math.sin(this.t)+this.y*Math.cos(this.t)-5,80,10);
        context.rotate(-this.t);
    }//砲身の描画処理

    body(){
        context.rotate(this.p);
        context.strokeRect(this.x*Math.cos(this.p)+this.y*Math.sin(this.p)-70,-1*this.x*Math.sin(this.p)+this.y*Math.cos(this.p)-40,140,80);
        context.rotate(-this.p);
    }//車体の描画処理

    collision_front(){
        var x1=this.x+70*Math.cos(this.p)+40*Math.sin(this.p);
        var y1=this.y+70*Math.sin(this.p)-40*Math.cos(this.p);
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
            temp=context.getImageData(x1-i*Math.sin(this.p),y1+i*Math.cos(this.p),1,1);
            //temp=context.getImageData(301,401,1,1)
            //console.log(temp.data[0]);  
            sum+=te();
        }
        this.front=sum;
    }//車体前面の当たり判定

    hosin_collision_front(){
        var v =2*Math.atan((-14+Math.sqrt(259))/7);
        var w =2*Math.atan((-14+Math.sqrt(259))/9);
        var u=(this.t-this.p+2*Math.PI)%(2*Math.PI);
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
                temp=context.getImageData(this.x+95*Math.cos(this.t)+(5-i)*Math.sin(this.t),this.y+95*Math.sin(this.t)-(5-i)*Math.cos(this.t),1,1);
                sum+=te();
            }
        }else if(u>0 && u<=v){
            m=rot(this.x+70,this.y+70*Math.tan(u)-5/Math.cos(u),this.x,this.y,this.p);
            for(var i=0;i<95+5*Math.tan(u)-70/Math.tan(u);i++){
                temp=context.getImageData(m[0]+i*Math.cos(this.t)+1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
            for(var i=0;i<10;i++){
                temp=context.getImageData(this.x+95*Math.cos(this.t)+(5-i)*Math.sin(this.t)+1,this.y+95*Math.sin(this.t)-(5-i)*Math.cos(this.t),1,1);
                sum+=te();
            }
        }else if(u>v && u<Math.PI/2){
            m=rot(this.x+40/Math.tan(u)+5/Math.sin(u),this.y+40,this.x,this.y,this.p);
            for(var i=0;i<95+5*Math.tan(u)-10/(Math.sin(2*u))-40/Math.sin(u);i++){
                temp=context.getImageData(m[0]+i*Math.cos(this.t)+1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
            for(var i=0;i<10;i++){
                temp=context.getImageData(this.x+95*Math.cos(this.t)+(5-i)*Math.sin(this.t)+1,this.y+95*Math.sin(this.t)-(5-i)*Math.cos(this.t),1,1);
                sum+=te();
            }
        }else if(u==Math.PI/2){
            m=rot(this.x+5,this.y+40,this.x,this.y,this.p);
            for(var i=0;i<55;i++){
                temp=context.getImageData(m[0]+i*Math.cos(this.t)+1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
        }else if(u>Math.PI/2 && u<Math.PI-w){
            m=rot(this.x+40/Math.tan(u)+5/Math.sin(u),this.y+40,this.x,this.y,this.p);
            for(var i=0;i<95+5*Math.tan(u)-10/(Math.sin(2*u))-40/Math.sin(u);i++){//ここの処理怪しい
                temp=context.getImageData(m[0]+i*Math.cos(this.t)+1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
        }else if(u>=Math.PI-w && u<Math.PI){
            m=rot(this.x-70,this.y-70*Math.tan(u)-5/Math.cos(u),this.x,this.y,this.p);
            
            for(var i=0;i<95+5*Math.tan(u)+70/Math.cos(u);i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)+1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
        
        }else if(u>Math.PI && u<=Math.PI+w){
            m=rot(this.x-70,this.y-70*Math.tan(u)+5/Math.cos(u),this.x,this.y,this.p);
            for(var i=0;i<95-5*Math.tan(u)+70/Math.cos(u);i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)+1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }      
        }else if(u>Math.PI+w && u<3*Math.PI/2){
            m=rot(this.x-40/Math.tan(u)-5/Math.sin(u),this.y-40,this.x,this.y,this.p);
            for(var i=0;i<95+5/Math.tan(u)+40/Math.sin(u);i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)+1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
        }else if(u==3*Math.PI/2){
            m=rot(this.x+5,this.y-40,this.x,this.y,this.p);
            for(var i=0;i<55;i++){
                temp=context.getImageData(m[0]+i*Math.cos(this.t)+1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
        }else if(u>3*Math.PI/2 && u<=2*Math.PI-v){
            m=rot(this.x-40/Math.tan(u)-5/Math.sin(u),this.y-40,this.x,this.y,this.p);
            for(var i=0;i<95+5/Math.tan(u)+40/Math.sin(u);i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)+1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
            for(var i=0;i<10;i++){
                temp=context.getImageData(this.x+95*Math.cos(this.t)-(5-i)*Math.sin(this.t)+1,this.y+95*Math.sin(this.t)+(5-i)*Math.cos(this.t),1,1);
                sum+=te();
            }
        }else{
            m=rot(this.x+70,this.y+70*Math.tan(u)+5/Math.cos(u),this.x,this.y,this.p);
            for(var i=0;i<95-5*Math.tan(u)-70/Math.cos(u);i++){
                temp=context.getImageData(m[0]+i*Math.cos(this.t)+1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
            for(var i=0;i<10;i++){
                temp=context.getImageData(this.x+95*Math.cos(this.t)-(5-i)*Math.sin(this.t)+1,this.y+95*Math.sin(this.t)+(5-i)*Math.cos(this.t),1,1);
                sum+=te();
            }
        }
        this.front+=sum;
    }//砲身前面の当たり判定

    hosin_collision_back(){
        var v =2*Math.atan((-14+Math.sqrt(259))/7);
        var w =2*Math.atan((-14+Math.sqrt(259))/9);
        var u=(this.t-this.p+2*Math.PI)%(2*Math.PI);
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
            m=rot(this.x+70,this.y+70*Math.tan(u)+5/Math.cos(u),this.x,this.y,this.p);
            for(var i=0;i<95-5*Math.tan(u)-70/Math.cos(u);i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)-1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
        }else if(u>w && u<Math.PI/2){
            m=rot(this.x+40/Math.tan(u)-5/Math.sin(u),this.y+40,this.x,this.y,this.p);
            for(var i=0;i<95+5/Math.tan(u)-40/Math.sin(u);i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)-1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
        }else if(u==Math.PI/2){
            m=rot(this.x-5,this.y+40,this.x,this.y,this.p);
            for(var i=0;i<55;i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)-1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }    
        }else if(u>Math.PI/2 && u<=Math.PI-v){
            m=rot(this.x+40/Math.tan(u)-5/Math.sin(u),this.y+40,this.x,this.y,this.p);
            for(var i=0;i<95+5/Math.tan(u)-40/Math.sin(u);i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)-1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
            for(var i=0;i<10;i++){
                temp=context.getImageData(this.x+95*Math.cos(this.t)-(5-i)*Math.sin(this.t)+i*Math.sin(this.t)-1,this.y+95*Math.sin(this.t)+(5-i)*Math.cos(this.t),1,1);
                sum+=te();
            }
        }else if(u>Math.PI-v && u<Math.PI){
            m=rot(this.x-70,this.y-70*Math.tan(u)+5/Math.cos(u),this.x,this.y,this.p);
            for(var i=0;i<95-5*Math.tan(u)+70/Math.cos(u);i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)-1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
            for(var i=0;i<10;i++){
                temp=context.getImageData(this.x+95*Math.cos(this.t)-(5-i)*Math.sin(this.t)+i*Math.sin(this.t)-1,this.y+95*Math.sin(this.t)+(5-i)*Math.cos(this.t),1,1);
                sum+=te();
            }
        }else if(u==Math.PI){
            for(var i=0;i<10;i++){
                temp=context.getImageData(this.x+95*Math.cos(this.t)-(5-i)*Math.sin(this.t)+i*Math.sin(this.t)-1,this.y+95*Math.sin(this.t)+(5-i)*Math.cos(this.t),1,1);
                sum+=te();
            }
        }else if(u>Math.PI && u<=Math.PI+v){
            m=rot(this.x-70,this.y-70*Math.tan(u)-5/Math.cos(u),this.x,this.y,this.p);
            for(var i=0;i<95+5*Math.tan(u)+70/Math.cos(u);i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)-1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
            for(var i=0;i<10;i++){
                temp=context.getImageData(this.x+95*Math.cos(this.t)-(5-i)*Math.sin(this.t)+i*Math.sin(this.t)-1,this.y+95*Math.sin(this.t)+(5-i)*Math.cos(this.t),1,1);
                sum+=te();
            }
        }else if(u>Math.PI+v && u<3*Math.PI/2){
            m=rot(this.x-40/Math.tan(u)+5/Math.sin(u),this.y-40,this.x,this.y,this.p);
            for(var i=0;i<95-5/Math.tan(u)+40/Math.sin(u);i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)-1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
            for(var i=0;i<10;i++){
                temp=context.getImageData(this.x+95*Math.cos(this.t)-(5-i)*Math.sin(this.t)+i*Math.sin(this.t)-1,this.y+95*Math.sin(this.t)+(5-i)*Math.cos(this.t),1,1);
                sum+=te();
            }
        }else if(u==3*Math.PI/2){
            m=rot(this.x-5,this.y-40,this.x,this.y,this.p);
            for(var i=0;i<55;i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)-1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
        }else if(u>3*Math.PI/2 && u<2*Math.PI-w){
            m=rot(this.x-40/Math.tan(u)+5/Math.sin(u),this.y-40,this.x,this.y,this.p);
            for(var i=0;i<95-5/Math.tan(u)+40/Math.sin(u);i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)-1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
        }else if(u>=2*Math.PI-w && u<2*Math.PI){
            m=rot(this.x+70,this.y+70*Math.tan(u)-5/Math.cos(u),this.x,this.y,this.p);
            for(var i=0;i<95+5*Math.tan(u)-70/Math.cos(u);i++){
                //context.fillRect(m[0]+i*Math.cos(t),m[1]+i*Math.sin(t),1,1);
                temp=context.getImageData(m[0]+i*Math.cos(this.t)-1,m[1]+i*Math.sin(this.t),1,1);
                sum+=te();
            }
        }
        this.back+=sum;
    }//砲身背面の当たり判定

    collision_back(){
        var x1=this.x-70*Math.cos(this.p)+40*Math.sin(this.p);
        var y1=this.y-70*Math.sin(this.p)-40*Math.cos(this.p);
        var temp=[];
        var sum=0;
        for(var i=0;i<80;i++){
            temp=context.getImageData(x1-i*Math.sin(this.p),y1+i*Math.cos(this.p),1,1);
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
        this.back=sum;
    }//背面の当たり判定

    collision_left(){
    
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
            temp=context.getImageData(this.x+41*Math.cos(this.p-Math.PI/2)+i*Math.cos(this.p),this.y+41*Math.sin(this.p-Math.PI/2)+i*Math.sin(this.p),1,1);
            sum += te();
        }
        for(var i=0;i<70;i++){
            temp=context.getImageData(this.x+41*Math.cos(this.p+Math.PI/2)-i*Math.cos(this.p),this.y+41*Math.sin(this.p+Math.PI/2)-i*Math.sin(this.p),1,1);
            sum += te();
        }
        for(var i=0;i<40;i++){
            temp=context.getImageData(this.x+71*Math.cos(this.p)-i*Math.cos(this.p-Math.PI/2),this.y+71*Math.sin(this.p)-i*Math.sin(this.p-Math.PI/2),1,1);
            sum += te();
        }
        for(var i=0;i<40;i++){
            temp=context.getImageData(this.x-71*Math.cos(this.p)+i*Math.cos(this.p-Math.PI/2),this.y-71*Math.sin(this.p)-i*Math.sin(this.p-Math.PI/2),1,1);
            sum += te();
        }
        
        this.left=sum;
    }//車体の左旋回の当たり判定

    hosin_collision_left(){
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
        for(var i=0;i<55;i++){
            //context.fillRect(x+(17+i)*Math.cos(t)+6*Math.sin(t),y+(17+i)*Math.sin(t)-6*Math.cos(t),1,1);
            temp=context.getImageData(this.x+(95-i)*Math.cos(this.t)+6*Math.sin(this.t),this.y+(95-i)*Math.sin(this.t)-6*Math.cos(this.t),1,1);
            sum += te();
        }
        /*for(var i=0;i<10;i++){
            m=rot(x+95,y-5,x,y,t);
            temp=context.getImageData(m[0]-i*Math.sin(t),m[1]+i*Math.cos(t),1,1);
            sum += te();
        }*/
        this.hosin_left=sum;  
    }

    hosin_collision_right(){
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
        for(var i=0;i<55;i++){
            temp=context.getImageData(this.x+(95-i)*Math.cos(this.t)-6*Math.sin(this.t),this.y+(95-i)*Math.sin(this.t)+6*Math.cos(this.t),1,1);
            sum += te();
        }
        /*for(var i=0;i<10;i++){
            m=rot(x+95,y-5,x,y,t);
            temp=context.getImageData(m[0]-i*Math.sin(t),m[1]+i*Math.cos(t),1,1);
            sum += te();
        }*/
        this.hosin_right=sum;  
    }

    collision_right(){
    
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
            temp=context.getImageData(this.x-41*Math.cos(this.p-Math.PI/2)+i*Math.cos(this.p),this.y-41*Math.sin(this.p-Math.PI/2)+i*Math.sin(this.p),1,1);
            sum += te();
        }
        for(var i=0;i<70;i++){
            temp=context.getImageData(this.x-41*Math.cos(this.p+Math.PI/2)-i*Math.cos(this.p),this.y-41*Math.sin(this.p+Math.PI/2)-i*Math.sin(this.p),1,1);
            sum += te();
        }
        for(var i=0;i<40;i++){
            temp=context.getImageData(this.x+71*Math.cos(this.p)+i*Math.cos(this.p-Math.PI/2),this.y+71*Math.sin(this.p)+i*Math.sin(this.p-Math.PI/2),1,1);
            sum += te();
        }
        for(var i=0;i<40;i++){
            temp=context.getImageData(this.x-71*Math.cos(this.p)-i*Math.cos(this.p-Math.PI/2),this.y-71*Math.sin(this.p)-i*Math.sin(this.p-Math.PI/2),1,1);
            sum += te();
        }
        this.right=sum;
    }//車体の右旋回の当たり判定
}
