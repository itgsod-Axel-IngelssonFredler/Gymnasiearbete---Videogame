/**
 * Created by axel.ingelssonfredle on 15/01/16.
 */
WebsocketServer = require("ws").Server;		//This adds the "ws" module to this file
                                            //and uses the "Server" part of it.
Entity = require('./Entity').Entity;
Player = require('./Entity').Player;
var player = new Player(0,0,5,0,0);
console.log(player);

wss = new WebsocketServer({port:4040});		//Here we create a new object from the previously obtained websocket server

wss.on("connection", function(ws) {
    ws.on("message", function(msg) {
    });
    console.log("Opened once");
});