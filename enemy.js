export default class Enemy {
    constructor(positionX,positionY){
        this.positionX = positionX;
        this.positionY = positionY;
    }
    drawBasic(ctx) {
        //ctx.fillStyle = '#F0F';
         //ctx.fillRect(this.positionX,this.positionY,20,20);
         ctx.drawImage(enemyModel,this.positionX,this.positionY);
        }
    drawBoss(ctx) {
        //ctx.fillStyle = '#F00';
       // ctx.fillRect(this.positionX,this.positionY,40,40);
        ctx.drawImage(enemyModel2,this.positionX,this.positionY);

        }
    update(ctx,type) {
        if(type==1) this.positionY += 0.2;
        else if(type==2) this.positionY += 0.2;
    }
       
}