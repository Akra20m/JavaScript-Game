import Ship from './ship.js';
import Control from './control.js';
import Enemy from './enemy.js';
import Formation from './formation.js';
import { levelInfo } from './levels.js';





const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');





let ship = new Ship(canvas.width, canvas.height);
let control = new Control(ship,ctx);
let enemy = [];

for(let i=0;i<levelInfo[0].num;i++){
     enemy[i]=new Enemy(levelInfo[0].positionX[i],levelInfo[0].positionY[i]);
}

let formation = new Formation(enemy,ship);

ship.draw(ctx);
formation.drawFormation(ctx,levelInfo[0]);



function mainLoop() {
    ctx.clearRect(0,0,canvas.width, canvas.height);

    ship.update(control.vertical,control.horizontal);
    formation.updateFormation(ctx,levelInfo[0]);

    ship.draw(ctx);
    if(ship.count!=0){
        ship.updateBullet(ctx);
        formation.checkHit(ship.bulletPositionX,ship.bulletPositionY,ship.count+1,ship);

    }


    window.requestAnimationFrame(mainLoop);
}

mainLoop();