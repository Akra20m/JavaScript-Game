export default class Ship {

    constructor(canvasWidth,canvasHeight) {
        this.width = 20;
        this.height = 20;
        
        this.positionX = (canvasWidth - this.width)/2;
        this.positionY = canvasHeight - this.height - 10;

        this.bulletPositionY=[];
        this.bulletPositionX=[];
        this.isHit=[];
        this.count=0;
    }
  
    draw(ctx) {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(this.positionX,this.positionY,this.width,this.height);
    }

    update(vertical=0,horizontal=0) {

        if(this.positionX > 0 && this.positionX <= (600-this.width)) this.positionX+=horizontal*4;
        else{
            if((this.positionX<=0 && horizontal == 1) || (this.positionX > (600-this.width) && horizontal == -1) ) this.positionX+=horizontal*4;
            else this.positionX+=0;
        }

        if(this.positionY > 0 && this.positionY <= (600-this.height)) this.positionY+=vertical*4;
        else{
            if((this.positionY<=0 && vertical == 1) || (this.positionY > (600-this.height) && vertical == -1) ) this.positionY+=vertical*4;
            else this.positionY+=0;
        }
        
           
    }
    
    fire(ctx) {
        if(this.count==10) this.count=0;
        this.bulletPositionY[this.count] = this.positionY - 6 ;
        this.bulletPositionX[this.count]= this.positionX + 7 ;
        this.isHit[this.count]=false;
        ctx.fillRect(this.bulletPositionX,this.bulletPositionY,6,6);
        this.count++;
        console.log(this.count)

    }

    updateBullet(ctx) {
        for(let i=0; i<10;i++){
            if(!this.isHit[i]){
                ctx.fillRect(this.bulletPositionX[i],this.bulletPositionY[i],5,5);
                this.bulletPositionY[i] -= 10;
            }
        }
    }
}