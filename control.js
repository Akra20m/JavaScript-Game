export default class Control {
    constructor(ship,ctx){
        this.vertical = 0;
        this.horizontal =0;
        this.fired = false;
        this.start = false;
        this.pause = false;
        this.retry = false;
        this.goAgain= false;
        document.addEventListener("keydown", event =>{
            let key = event.code;


            if(this.start==true && this.pause==false && this.retry==false){
                if(key == "ArrowRight") this.horizontal = 1; // move right
                else if(key == "ArrowLeft") this.horizontal = -1; // move left
                else if(key == "ArrowDown") this.vertical= 1; // move down
                else if(key == "ArrowUp") this.vertical= -1; // move up
                else if(key == "Space") {
                    if(this.fired == false){
                        ship.fire(ctx);
                        this.fired = true;
                    }
                }
                else if(key == "Enter"){
                    this.pause = true;
                    ctx.fillStyle = "rgba(255,255,255,0.3)";
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    ctx.font = "40px Ariel";
                    ctx.fillStyle = "#FFF";
                    ctx.textAlign = "center";
                    ctx.fillText("Enter to continue",250,250);
                } 
            }
            
            else if(key == "Enter" && this.retry ==false){
                if(this.pause==false) this.start = true;
                else this.pause =false;
            }

            else if(key== "KeyR" && this.retry==true){
                this.goAgain = true;
            }
        });

        document.addEventListener("keyup", event =>{
            let key = event.code;

            if(key == "ArrowRight") this.horizontal = 0; // move right
            else if(key == "ArrowLeft") this.horizontal = 0; // move left
            else if(key == "ArrowDown") this.vertical= 0; // move down
            else if(key == "ArrowUp") this.vertical= 0; // move up
            else if(key == "Space") this.fired = false;



        });

    }

    reset() {
        this.vertical = 0;
        this.horizontal =0;
        this.fired = false;
        this.start = false;
        this.pause = false;
        this.retry = false;
        this.goAgain= false;
    }
}