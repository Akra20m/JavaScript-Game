export default class Ship {

    constructor(canvasWidth,canvasHeight,shot) {
        this.width = 40;
        this.height = 40;
        
        this.positionX = (canvasWidth - this.width)/2;
        this.positionY = canvasHeight - this.height - 10;

        this.bulletPositionY=[];
        this.bulletPositionX=[];
        this.bulletHit=[];
        this.hitCount=0;
        this.count=0;
        this.shot = shot;
    }
  
    draw(ctx) {
        //ctx.fillStyle = '#FFF';
        //ctx.fillRect(this.positionX,this.positionY,this.width,this.height);
        ctx.drawImage(shipModel,this.positionX,this.positionY);
    }

    update(vertical=0,horizontal=0) {

        if(this.positionX > 0 && this.positionX <= (500-this.width)) this.positionX+=horizontal*4;
        else{
            if((this.positionX<=0 && horizontal == 1) || (this.positionX > (500-this.width) && horizontal == -1) ) this.positionX+=horizontal*4;
            else this.positionX+=0;
        }

        if(this.positionY > 0 && this.positionY <= (500-this.height)) this.positionY+=vertical*4;
        else{
            if((this.positionY<=0 && vertical == 1) || (this.positionY > (500-this.height) && vertical == -1) ) this.positionY+=vertical*4;
            else this.positionY+=0;
        }
        
           
    }
    
    fire(ctx) {
        if(this.count==10) this.count=0;
        this.bulletPositionY[this.count] = this.positionY - 6 ;
        this.bulletPositionX[this.count]= this.positionX + 17 ;
        this.bulletHit[this.count]=false;
        ctx.fillStyle = '#FFF';
        ctx.fillRect(this.bulletPositionX,this.bulletPositionY,6,6);
        this.count++;
        this.shot.play();
        //console.log(this.count)

    }

    updateBullet(ctx) {
        for(let i=0; i<10;i++){
            if(!this.bulletHit[i]){
                ctx.fillStyle = '#FFF';
                ctx.fillRect(this.bulletPositionX[i],this.bulletPositionY[i],6,6);
                this.bulletPositionY[i] -= 10;
            }
        }
    }

    reset(canvasWidth,canvasHeight,shot) {
        this.width = 40;
        this.height = 40;
        
        this.positionX = (canvasWidth - this.width)/2;
        this.positionY = canvasHeight - this.height - 10;

        this.bulletPositionY=[];
        this.bulletPositionX=[];
        this.bulletHit=[];
        this.hitCount=0;
        this.count=0;
        this.shot = shot;
    }
}