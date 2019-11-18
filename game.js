import Ship from './ship.js';
import Control from './control.js';
import Enemy from './enemy.js';
import Formation from './formation.js';
import { levelInfo } from './levels.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let level = document.getElementById("level");
let score = document.getElementById("score");
let live = document.getElementById("live");
let time = document.getElementById("time");
let shipModel = document.getElementById("shipModel");
let enemyModel = document.getElementById("enemyModel");
let enemyModel2 = document.getElementById("enemyModel2");
let background = document.getElementById("background");
let shot = document.getElementById("shot");
let explosion = document.getElementById("explosion");
explosion.volume = 0.2;
let info_container = document.getElementById("info-container");

//create instance/object of all the classes
let ship = new Ship(canvas.width, canvas.height,shot); 
let control = new Control(ship,ctx);
let enemy = [];
for(let i=0;i<levelInfo[0].num;i++){
     enemy[i]=new Enemy(levelInfo[0].positionX[i],levelInfo[0].positionY[i]);
}
let formation = new Formation(enemy,ship,explosion);

//declare variables and assign them initial values
let timer =0;
let totalTime = 15;
let shipDestroyedCount =0;
let i =0;
let tempCount= 0;
let hitCount = 3;
time.textContent = totalTime;

//draw the start page in the canvas
function startPage() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = "40px Ariel";
    ctx.fillStyle = "#FFF";
    ctx.textAlign = "center";
    ctx.fillText("Press Enter to start",250,200);
    ctx.fillStyle = "yellow";
    ctx.fillText("------------------------",250,150);
    ctx.fillText("------------------------",250,250);
    ctx.font = "25px Ariel";
    ctx.fillStyle = "orange";
    ctx.textAlign = "left";
    ctx.fillText("Keyboard Arrows  ",110,380)
    ctx.fillText("Spacebar  ",110,410)
    ctx.fillStyle = "#FF0";
    ctx.fillText("MOVE",320,380)
    ctx.fillText("SHOOT",320,410)
}

//this function is called between levels and at the game end to reassign/redefine new values
function redefine(k){
    ship.reset(canvas.width, canvas.height,shot);
    control.reset();
    enemy = [];
    for(let i=0;i<levelInfo[k].num;i++){
         enemy[i]=new Enemy(levelInfo[k].positionX[i],levelInfo[k].positionY[i]);
        }
    formation = new Formation(enemy,ship,explosion);
}

startPage(); // call the function to draw the start page

function mainLoop() {
    
    if(control.start==true && control.pause==false && hitCount >0 && i<=(levelInfo.length-1)){

        ctx.clearRect(0,0,canvas.width, canvas.height); //cleans the canvas every frame 
        info_container.style.visibility = "visible";
        level.textContent = i+1; //shows the current level the player in 
        live.textContent = hitCount; //shows the lives a player has
        //background, ship, enemies and bullets are drawn and updated
        ctx.drawImage(background,0,0);
        ship.draw(ctx,shipModel);
        ship.update(control.vertical,control.horizontal);
        formation.drawFormation(ctx,levelInfo[i],enemyModel,enemyModel2);
        formation.updateFormation(ctx,levelInfo[i],timer);
        ship.updateBullet(ctx);
        //checks if bullets or ship hit a target(enemy) 
        let temp=formation.checkHit(ship,hitCount);
        shipDestroyedCount+=temp.shipcount;
        tempCount+=temp.shipcount;
        score.textContent = tempCount;
        hitCount =temp.hitCount;
        //keeps updating the time in the level every second
        timer++;
        if(timer%60==0){
            time.textContent = totalTime - timer/60;
        }
        //if time is more than 15 seconds or the player lost 3 lives, end the level and move to the next one
        if(((timer) >= 900 || (shipDestroyedCount==levelInfo[i].num)) && i<(levelInfo.length)) {
            i++;
            //check if we are on the last level            
            if(i < (levelInfo.length)){
                control.pause = true;
                shipDestroyedCount = 0;
                ctx.fillStyle = '#000';
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.font = "35px Ariel";
                ctx.fillStyle = "yellow";
                ctx.textAlign = "center";
                ctx.fillText("Press Enter for Next Level",250,250);
                timer = 0;
                time.textContent = totalTime;
                redefine(i); // redefine and reassign values for next level   
            }
        }    
    }
    //checks if we reach the end of the game
    else if(hitCount<=0 || i==(levelInfo.length)){
        //shows the end page and the player's performance
        info_container.style.visibility = "hidden";
        ctx.fillStyle = '#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.font = "40px Ariel";
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.fillText("Your Score " + tempCount,250,200);
        ctx.fillStyle = "yellow";
        if(tempCount <= 3) ctx.fillText("SERIOUSLY",250,250);
        else if(tempCount < 20) ctx.fillText("NOT BAD",250,250);
        else if(tempCount < 40) ctx.fillText("YOU COULD DO BETTER",250,250);
        else ctx.fillText("GREAT JOB",250,250);
        ctx.fillStyle = "#FFF";
        ctx.fillText("Press R to try again",250,300);

        control.retry =true;
        control.start = false;
    }
    //wait for the player to press R to start the game all over again
    if(control.goAgain==true) {
        redefine(0);
        startPage();
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





