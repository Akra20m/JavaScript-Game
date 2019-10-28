
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
checkHit(bX,bY,count,ship){
  for(let i=0; i<count;i++){
    for(let j=0; j<this.enemy.length;j++){
      if(Math.abs(bX[i]-this.enemy[j].positionX)< 12 && Math.abs(bY[i]-this.enemy[j].positionY) < 12 ) {
        ship.isHit[i]=true;
        this.isHit[j]=true;
      }
      else(console.log("NO HIT"));
    }
  }
}
}
