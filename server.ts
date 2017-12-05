"use strict";


var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
app.use(express.static('dist')); //Verzeichniss für eigene Scripts zur Verfügung stellen TODO für webpack anpassen
//Include Own Classes for node_modules
import {SMapTile} from "./serverModel/SMapTile";
import {SPlayer} from "./serverModel/SPlayer";
import {SMap} from "./serverModel/SMap";
import {SWorld} from "./serverModel/SWorld";


//Gloabal Variables
var connections:{[key:string]:any} = [];

var currentWorld: SWorld = new SWorld("map1");
//
//
//Start Server
server.listen(3000);
console.log("Server running on Port 3000");

//Send Files to Client on Connect
app.get("/", function(req: any, res: any) {
    res.sendFile("index.html");
});

//If a new CLient is connected
io.sockets.on("connection", function(socket: any) {
    connections[socket.id] = socket;
    console.log("New Client connected: " + socket.id);

    //Disconnect
    socket.on("disconnect", function(data:string) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Client disconnected");
    });
    //Input from Client
    socket.on("clientInput", function(data:string) {
        console.log("Client with id " + socket.id + " says: " + data);
        var inputData:any = JSON.parse(data);
        var targetPlayer:SPlayer = currentWorld.getPlayer(inputData.clientId);
        //Extract pressed key from mapData
        //TODO Validate if this is an allowed operation
        switch (inputData.value) {
          case "ArrowLeft": //LEFT
            targetPlayer.setPosition(targetPlayer.x - 1, targetPlayer.y);
            break;
          case "ArrowUp": //UP
            targetPlayer.setPosition(targetPlayer.x, targetPlayer.y - 1);
            break;
          case "ArrowRight": //RIGHT
            targetPlayer.setPosition(targetPlayer.x + 1, targetPlayer.y);
            break;
          case "ArrowDown": //DOWN
            targetPlayer.setPosition(targetPlayer.x, targetPlayer.y + 1);
            break;
          default:
            console.log("unknown key input from server");
            break;

        }

        var returnData:any = {
          type: "movement",
          target: "player",
          clientId: inputData.clientId,
          value: {x:targetPlayer.x,y:targetPlayer.y}
        }

        io.sockets.emit("serverInput", JSON.stringify(returnData));
    });
    //Client requests id
    socket.on("clientRequestId", function(data:string) {
        console.log("Client requests id: " + socket.id);
        //Send id and currentWorld to client
        socket.emit("serverAssignId", JSON.stringify({
            id: socket.id,
            world: currentWorld
        }));

        //Add new clients Player
        currentWorld.addPlayer(socket.id, 0, 0);
        for (var i in connections) {

            //Notify all Clients
            connections[i].emit("serverNewPlayer", JSON.stringify({
                playerId: socket.id,
                x: 0,
                y: 0
            }));

        }
    });


});
