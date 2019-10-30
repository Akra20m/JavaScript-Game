
export default class Formation {
    constructor(enemy,ship){
      this.enemy=[];
      this.isHit=[];

     for(let i=0;i<enemy.length;i++){
       this.enemy[i]=enemy[i];
       this.isHit[i]=false;
     }
    }

drawFormation(ctx,formation){
    for(let i=0;i<formation.num;i++){
        if(formation.type[i]==1) this.enemy[i].drawBasic(ctx);
        else if(formation.type[i]==2) this.enemy[i].drawBoss(ctx)
    }
}
updateFormation(ctx,formation){
    for(let i=0;i<formation.num;i++){
      if(!this.isHit[i]){
        this.enemy[i].update(ctx,formation.type[i]);
      }
      else{
        this.enemy[i].positionX = 600;
        this.enemy[i].positionY = 600;
      }
         
    }
}

checkHit(ship,hitCount){
  let shipcount =0;
  
  for(let j=0; j<this.enemy.length;j++){
    for(let i=0; i<(ship.count+1);i++){
      if(Math.abs(ship.bulletPositionX[i]-this.enemy[j].positionX)< 12 && Math.abs(ship.bulletPositionY[i]-this.enemy[j].positionY) < 12 ) {
        ship.bulletHit[i]=true;
        this.isHit[j]=true;
        shipcount++;
      }
      }
    if(Math.abs(ship.positionX-this.enemy[j].positionX)< 12 && Math.abs(ship.positionY-this.enemy[j].positionY) < 12 ) {
    hitCount--;
    this.isHit[j]=true;
    shipcount++;
      //else(console.log("NO HIT"));
    }
    
  }
  return {
    shipcount: shipcount,
    hitCount: hitCount,
  };
}
}
