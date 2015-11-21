/**
 * Created by fredrik.svahn on 20/11/15.
 */
function Game(canvas) {
    var width = 900;
    var height = 600;
    var context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    var handler = new Handler();
    var frames = 0;
    var fps = 0;
    var time = new Date().getTime();
    var pastTime = new Date().getTime();
    var deltaTime = 0;

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
        handler.draw();
    };

    this.tick = function() {
        handler.tick();
    };


}



function main() {
    var canvas = document.getElementById("GameCanvas") || document.body.appendChild(document.createElement("canvas"));
    var game1 = new Game(canvas);
    var loop = setInterval(function() {
        game1.run();
    },16.6666667);
}
