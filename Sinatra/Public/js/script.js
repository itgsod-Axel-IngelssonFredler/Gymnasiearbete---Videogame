function run() {

    console.log("Javascript loaded!");

    socket = new WebSocket("ws://localhost:1111","protocolOne");


    socket.onopen = function () {
        console.log("Websocket open!");
        //window.addEventListener("keydown", function(evt) {socket.send("Key pressed: "+evt.keyCode);})

    };

    socket.onmessage = function(evt) {
        var msg = evt.data;
        getResponse();
        
    };

}

function testDelay() {
    sendtime = new Date().getTime();
    socket.send("ping");
    


}

function getResponse() {
    responsetime = new Date().getTime();
    console.log("Delay: "+(responsetime-sendtime)+" ms");
}

function close() {
    socket.close();
}