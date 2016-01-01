function run() {    //This is function that runs when the "onload" 
                    //event on the body of the site is called

    socket = new WebSocket("ws://localhost:3030"); //Here we create a "WebSocket" object using the built-in "WebSocket"
    
    socket.onopen = function() { //This function is attached to the "onopen" event of the socket, 
                                 //meaning that it will run as soon
                                 //as the socket is open and ready to be used. 
        console.log("OPEN!");
    }
    canvas = document.getElementById("canvas"); //Here we create a global variable with the name "canvas"
                                                //using the "getElementById" function on the html element with the id "canvas"
    
    context = canvas.getContext("2d");      //

}

function StartGameLoop() {      //This function starts the primary loop for our game.
                                // The loop starts by clearing the entire canvas
                                // and then renders all game objects in order.

    interval = setInterval(function() {
        context.clearRect(0,0,canvas.width,canvas.height);
        context.fillStyle = "#0000FF"

        context.fillRect(0,0,canvas.width,canvas.height);
    }, 16.67);      // In the "setInterval" function we use the interval 16.67~ because of the following equation:
                    // Our target frames per second = 60
                    // If we convert that to seconds per frame instead we get: frames/seconds --> seconds/frames, amount of frames per 1 second = 60/1, amount of seconds per 60 frames = 1/60.
                    // Since the "setInterval" function uses miliseconds, the final equation for the interval is: 1000 (ms)/ 60 (fps) ≈ 16.67 (ms per frame)

    return "Game Started!"
}

function StopGameLoop() {       //This function stops the game loop. 
    clearInterval(interval);
    return "Game Stopped!"
}