export default class Enemy {
    constructor(positionX,positionY){
        this.positionX = positionX;
        this.positionY = positionY;
    }
    drawBasic(ctx) {
        ctx.fillStyle = '#F0F';
         ctx.fillRect(this.positionX,this.positionY,20,20);
        }
    drawBoss(ctx) {
        ctx.fillStyle = '#F00';
        ctx.fillRect(this.positionX,this.positionY,40,40);
        }
    update(ctx,type) {
        //if(type==1) this.drawBasic(ctx);
        //else if(type==2) this.drawBoss(ctx);
        this.positionY += 0.1;
    }
       
}