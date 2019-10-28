export default class Control {
    constructor(ship,ctx){
        this.vertical = 0;
        this.horizontal =0;
        this.fired = false;
        document.addEventListener("keydown", event =>{
            let key = event.code;

           // let vertical,horizontal;
            //if(key == "ArrowRight") ship.update(vertical=0,horizontal=10); // move right
            //else if(key == "ArrowLeft") ship.update(vertical=0,horizontal=-10); // move left
            //else if(key == "ArrowDown") ship.update(vertical=5,horizontal=0); // move down
            //else if(key == "ArrowUp") ship.update(vertical=-5,horizontal=0); // move up
            //else if(key == "Space") ship.fire(ctx);
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
}