import Ship from './ship.js';
import Control from './control.js';
import Enemy from './enemy.js';
import Formation from './formation.js';
import { levelInfo } from './levels.js';





const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let level = document.getElementById("level");
let score = document.getElementById("score");
let life = document.getElementById("life");

let info_container = document.getElementById("info-container");

let ship = new Ship(canvas.width, canvas.height);
let control = new Control(ship,ctx);
let enemy = [];

for(let i=0;i<levelInfo[0].num;i++){
     enemy[i]=new Enemy(levelInfo[0].positionX[i],levelInfo[0].positionY[i]);
}

let formation = new Formation(enemy,ship);

ctx.fillStyle = '#000';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.font = "40px Ariel";
ctx.fillStyle = "#FFF";
ctx.textAlign = "center";
ctx.fillText("Click Enter to start",300,300);

let timer =0;
let shipDestroyedCount =0;
let i =0;
let tempCount= 0;
let hitCount = 3;




function mainLoop() {
    
    if(control.start==true && control.pause==false && hitCount!=0){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        info_container.style.visibility = "visible";
        level.textContent = i+1;
        life.textContent = hitCount;
        ship.draw(ctx);
        ship.update(control.vertical,control.horizontal);
        formation.drawFormation(ctx,levelInfo[i]);
        formation.updateFormation(ctx,levelInfo[i]);
    
       // if(ship.count!=0){
            ship.updateBullet(ctx);
            let temp=formation.checkHit(ship,hitCount);
            shipDestroyedCount+=temp.shipcount;
            tempCount+=temp.shipcount;
            score.textContent = tempCount;
            hitCount =temp.hitCount;
       // }
        timer++;
        if((timer) >= 600 || (shipDestroyedCount==levelInfo[i].num)) {
            control.pause = true;
            shipDestroyedCount = 0;
            ctx.fillStyle = '#000';
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.font = "40px Ariel";
            ctx.fillStyle = "#FFF";
            ctx.textAlign = "center";
            ctx.fillText("Next Level",300,300);
            timer = 0;
            i++;
            ship = new Ship(canvas.width, canvas.height);
            control = new Control(ship,ctx);
            enemy = [];

            for(let i=0;i<levelInfo[0].num;i++){
                enemy[i]=new Enemy(levelInfo[0].positionX[i],levelInfo[0].positionY[i]);
            }

            formation = new Formation(enemy,ship);
        }    
    }
    if(hitCount==0){
        info_container.style.visibility = "hidden";
        ctx.fillStyle = '#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.font = "40px Ariel";
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.fillText("Game Over",300,300);
    }
    

    window.requestAnimationFrame(mainLoop);
}

mainLoop();





