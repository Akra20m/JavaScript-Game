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
let time = document.getElementById("time");
let shipModel = document.getElementById("shipModel");
let enemyModel = document.getElementById("enemyModel");
let enemyModel2 = document.getElementById("enemyModel2");
let shot = document.getElementById("shot");
let info_container = document.getElementById("info-container");

let ship = new Ship(canvas.width, canvas.height,shot);
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
ctx.fillText("Click Enter to start",250,250);

let timer =0;
let totalTime = 15;
let shipDestroyedCount =0;
let i =0;
let tempCount= 0;
let hitCount = 3;
time.textContent = totalTime;

function redefine(k){
    ship.reset(canvas.width, canvas.height,shot);
    control.reset();
    enemy = [];

    for(let i=0;i<levelInfo[k].num;i++){
         enemy[i]=new Enemy(levelInfo[k].positionX[i],levelInfo[k].positionY[i]);
        }

    formation = new Formation(enemy,ship);
}


function mainLoop() {
    
    if(control.start==true && control.pause==false && hitCount!=0 && i<=(levelInfo.length-1)){

        ctx.clearRect(0,0,canvas.width, canvas.height);
        info_container.style.visibility = "visible";
        level.textContent = i+1;
        life.textContent = hitCount;
        ship.draw(ctx,shipModel);
        ship.update(control.vertical,control.horizontal);
        formation.drawFormation(ctx,levelInfo[i],enemyModel,enemyModel2);
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
        if(timer%60==0){
            time.textContent = totalTime - timer/60;
        }
        if(((timer) >= 900 || (shipDestroyedCount==levelInfo[i].num)) && i<(levelInfo.length)) {
            i++;
            console.log(timer)
            
            if(i < (levelInfo.length)){
                control.pause = true;
                shipDestroyedCount = 0;
                ctx.fillStyle = '#000';
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.font = "40px Ariel";
                ctx.fillStyle = "#FFF";
                ctx.textAlign = "center";
                ctx.fillText("Next Level",250,250);
                timer = 0;
                time.textContent = totalTime;
                console.log(" level "+ i);
                console.log(typeof(i));
                redefine(i);       
            }

        }    

 
    }

    else if(hitCount==0 || i==(levelInfo.length)){
        info_container.style.visibility = "hidden";
        ctx.fillStyle = '#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.font = "40px Ariel";
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.fillText("Your Score " + tempCount,250,200);
        ctx.fillText("Space to try again",250,250);
        control.retry =true;
        control.start = false;


    }

    if(control.goAgain==true) {
        redefine(0);
        ctx.fillStyle = '#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.font = "40px Ariel";
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.fillText("Click Enter to start",250,250);

        timer =0;
        totalTime = 15;
        shipDestroyedCount =0;
        i =0;
        tempCount= 0;
        hitCount = 3;
        time.textContent = totalTime;

        control.goAgain = false;

    }
    

    window.requestAnimationFrame(mainLoop);
}

mainLoop();





