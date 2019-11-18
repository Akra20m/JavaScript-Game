export default class Enemy {
    constructor(positionX,positionY){
        this.positionX = positionX;
        this.positionY = positionY;
    }
    drawBasic(ctx) {
         ctx.drawImage(enemyModel,this.positionX,this.positionY);
        }
    drawBoss(ctx) {
        ctx.drawImage(enemyModel2,this.positionX,this.positionY);
        }
    update(ctx,type,move,timer) {
        if(move==1) {
            if(timer <400)this.positionY += 0.8;
            else if(timer <800)this.positionY -= 0.8;
        }
        else if(move==2) {
            if(timer < 50) this.positionX +=1;
            else if(timer < 400) this.positionY +=1;
            else if(timer < 450) this.positionX -=1;
            else if(timer < 800) this.positionY -=1;

        }
        else if(move==3) {
            if(timer < 50) this.positionX -=1;
            else if(timer < 400) this.positionY +=1;
            else if(timer < 450) this.positionX +=1;
            else if(timer < 800) this.positionY -=1;
        }
        else if(move==4) {
            if(timer < 100){
                this.positionX +=0.9;
                this.positionY +=1.4;
            }
            else if (timer < 200){
                this.positionX -=0.95;
                this.positionY +=1.6;
            }
            else if (timer <400) {
                this.positionY -=1.4;
            }
            else if(timer >500) this.positionY +=0.8;
        }
        else if(move==5) {
            if(timer < 100){
                this.positionX -=0.9;
                this.positionY +=1.4;
            }
            else if(timer < 200){
                this.positionX +=0.95;
                this.positionY +=1.6;
            }
            else if (timer <400) {
                this.positionY -=1.4;
            }
            else if(timer >500) this.positionY +=0.8;
        }
    }
       
}