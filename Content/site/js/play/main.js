/**
 * Created by fredrik.svahn on 20/11/15.
 */
function Game(canvas) {
    var width = 900;
    var height = 600;
    var context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    var frames = 0;
    var fps = 0;
    var time = new Date().getTime();
    var pastTime = new Date().getTime();
    var deltaTime = 0;
    var keyHash = {};
    this.handler = new Handler(context,keyHash);
    window.addEventListener("keydown", function(e) {
        e.preventDefault();
        keyHash[e.keyCode] = 1;
    },false);

    window.addEventListener("keyup", function(e) {
        //this.keyHash[e.keyCode] = 0;
    }, false);

    this.run = function() {
        time = new Date().getTime();
        deltaTime += time-pastTime;
        this.tick();
        this.draw();
        frames++;
        if(deltaTime>=1000) {
            fps = frames;
            deltaTime -= 1000;
            frames = 0;
        }
        pastTime = time;

    };

    this.draw = function() {
        context.clearRect(0,0,width,height);

        context.fillStyle = "#0000FF";
        context.fillRect(0,0,width,height);
        this.handler.draw(context);
    };

    this.tick = function() {
        this.handler.tick();
    };

    this.showKeyHash = function() {
        console.log(keyHash);
    }

}



function main() {
    var canvas = document.getElementById("GameCanvas") || document.body.appendChild(document.createElement("canvas"));
    game1 = new Game(canvas);
    var player = new GameObject(0,0,100,175,"#FF0000");
    game1.handler.addObject(player);
    var loop = setInterval(function() {
        game1.run();
    },15);
}

