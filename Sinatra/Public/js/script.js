function run() {    //This is function that runs when the "onload" 
                    //event on the body of the site is called

    socket = new WebSocket("ws://localhost:3030"); //Here we create a "WebSocket" object using the built-in "WebSocket"
    
    socket.onopen = function() { //This function is attached to the "onopen" event of the socket, 
                                 //meaning that it will run as soon
                                 //as the socket is open and ready to be used. 
        console.log("OPEN!");
    }

}