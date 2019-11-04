
export default class Formation {
    constructor(enemy,ship,explosion){
      this.enemy=[];
      this.isHit=[];
      this.explosion = explosion;

     for(let i=0;i<enemy.length;i++){
       this.enemy[i]=enemy[i];
       this.isHit[i]=false;
     }
    }

drawFormation(ctx,formation){
    for(let i=0;i<formation.num;i++){
      if(!this.isHit[i]){
        if(formation.type[i]==1) this.enemy[i].drawBasic(ctx);
        else if(formation.type[i]==2) this.enemy[i].drawBoss(ctx)
    }
      else {
        this.enemy[i].positionX = 500;
        this.enemy[i].positionY = 500;
      }
  }
}
updateFormation(ctx,levelInfo,timer){
    for(let i=0;i<this.enemy.length;i++){
      if(!this.isHit[i]){
        this.enemy[i].update(ctx,levelInfo.type[i],levelInfo.move[i],timer);
      }      
    }
}

checkHit(ship,hitCount){
  let shipcount =0;
  
  for(let j=0; j<this.enemy.length;j++){
    for(let i=0; i<(ship.count+1);i++){
      if((ship.bulletPositionX[i]-6 >= this.enemy[j].positionX-10)&&(ship.bulletPositionX[i] <= this.enemy[j].positionX+40) && (ship.bulletPositionY[i] <= this.enemy[j].positionY+30) && (Math.abs(ship.bulletPositionY[i]-this.enemy[j].positionY) < 40 ) && (this.isHit[j]==false) && (ship.bulletHit[i]==false)) {
        ship.bulletHit[i]=true;
        this.isHit[j]=true;
        this.explosion.play();
        shipcount++;
      }
      }
    if((ship.positionX >= this.enemy[j].positionX-25)&&(ship.positionX <= this.enemy[j].positionX+20) && (ship.positionY <= this.enemy[j].positionY+30) && Math.abs(ship.positionY-this.enemy[j].positionY) < 40) {
    hitCount--;
    this.isHit[j]=true;
    this.explosion.play();
    shipcount++;
    console.log(hitCount);
    }
    
  }
  return {
    shipcount: shipcount,
    hitCount: hitCount,
  };
}
}
