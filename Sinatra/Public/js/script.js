

function run() {    //This is function that runs when the "onload" 
                    //event on the body of the site is called
    socket = new WebSocket("ws://localhost:4040"); //Here we create a "WebSocket" object using the built-in "WebSocket"
    Entities = [];
    socket.onopen = function() { //This function is attached to the "onopen" event of the socket, 
                                 //meaning that it will run as soon
                                 //as the socket is open and ready to be used. 
        console.log("OPEN!");
        StartGameLoop()
    }

    socket.onmessage = function(msg) {
        msgArray = msg.data.split("_");
        if(msgArray[0]=="init") {
            console.log("initialized");
            EntityList = JSON.parse(msgArray[1]);
            console.log(EntityList);
        }
        Entities = JSON.parse(msg.data); //"Entities" contains all the objects in the game that have changed.
        updateEntities();
        
    }
    canvas = document.getElementById("canvas"); //Here we create a global variable with the name "canvas"
                                                //using the "getElementById" function on the html element with the id "canvas"
    context = canvas.getContext("2d");      //
}

function StartGameLoop() {      //This function starts the primary loop for our game.
                                // The loop starts by clearing the entire canvas
                                // and then renders all game objects in order.

    canvas.addEventListener("keydown", function(e) {keyPressed(e)});
    canvas.addEventListener("keyup", function(e) {keyReleased(e)});

    interval = setInterval(function() {
        context.clearRect(0,0,canvas.width,canvas.height);
        context.fillStyle = "#0000FF";
        context.fillRect(0,0,canvas.width,canvas.height);
        for(var i = 0; i < EntityList.length; i++) {
            context.fillStyle = "#FF0000";
            context.fillRect(EntityList[i].posX,EntityList[i].posY, EntityList[i].width,EntityList[i].height);
            //context.fillRect(0,0,50,50)
        }
        
    }, 1);      // In the "setInterval" function we use the interval 16.67~ because of the following equation:
                    // Our target frames per second = 60
                    // If we convert that to seconds per frame instead we get: frames/seconds --> seconds/frames, amount of frames per 1 second = 60/1, amount of seconds per 60 frames = 1/60.
                    // Since the "setInterval" function uses miliseconds, the final equation for the interval is: 1000 (ms)/ 60 (fps) ≈ 16.67 (ms per frame)

    return "Game Started!";
}

function updateEntities() {
    for(var i = 0; i < EntityList.length;i++) {
           EntityList[i] = Entities[i];
    }
 
    
}

function keyPressed(event) {
    
    socket.send("Pressed:"+event.keyCode);
    event.preventDefault();
}
function keyReleased(event) {
    socket.send("Released:"+event.keyCode);
    event.preventDefault();
}

function StopGameLoop() {       //This function stops the game loop. 
    clearInterval(interval);
    return "Game Stopped!"
}