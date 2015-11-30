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
    deltaTime = 0;
    this.state = 0;


    this.handler = new Handler(context);



    this.run = function() {
        time = new Date().getTime();
        deltaTime = time-pastTime;
        this.tick();
        this.draw();
        frames++;
        if(deltaTime>=100) {
            fps = frames;
            deltaTime -= 100;
            frames = 0;
        }

        pastTime = time;

    };

    this.draw = function() {
        context.clearRect(0,0,width,height);
        context.fillStyle = "#0000FF";
        context.fillRect(0,0,width,height);
        context.fillText(String(fps),50,50);
        this.handler.draw(context);
    };

    this.tick = function() {
        this.handler.tick();
    };

    this.animate



}

var state = 0;

function main() {
    var canvas = document.getElementById("GameCanvas") || document.body.appendChild(document.createElement("canvas"));
    game1 = new Game(canvas);
    player = new GameObject(0,0,100,175,"#FF0000");
    player.id = "PLAYER";

    var image1 = new Image();
    image1.src = "./img/runningcat.png";
    image1.onload = function() {
        player.animation_Running = new Animation(image1, 512 , 256);
        player.animation_Running.setCurrentDimensions();
    };


    game1.handler.addObject(player);
    var loop = setInterval(function() {
        game1.run();
    },20);
    document.addEventListener("keydown", function(e) {e.preventDefault(); game1.handler.keydown(e)});
    document.addEventListener("keyup",  function(e) {game1.handler.keyup(e)});

}

function setStateMainMenu() {

}



