"use strict";


var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
app.use(express.static('dist')); //Verzeichniss für eigene Scripts zur Verfügung stellen
//Include Own Classes for node_modules
import { Constants } from "./model/Constants"
import { ServerMapTile } from "./model/ServerMapTile";
import { ServerPlayer } from "./model/ServerPlayer";
import { ServerMap } from "./model/ServerMap";
import { ServerWorld } from "./model/ServerWorld";
import { Message } from "./model/Message";


//Gloabal Variables
var connections: { [key: string]: any } = [];
//The servers world
var currentWorld: ServerWorld = new ServerWorld("map1");

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
    socket.on("disconnect", function(data: string) {
        currentWorld.removePlayer(socket.id);
        //Notify all clients
        var returnMessage: Message = new Message(Constants.REMOVE, Constants.PLAYER, socket.id, undefined);
        io.sockets.emit("serverInput", returnMessage);

        console.log("Client disconnected");
    });


    //Input from Client
    socket.on("clientInput", function(message: Message) {
        console.log("Client with id " + socket.id + " says: " + message);
        var targetPlayer: ServerPlayer = currentWorld.getPlayer(message.clientId);
        //Extract pressed key from mapData
        //TODO Validate if this is an allowed operation
        switch (message.value) {
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
                console.log("unknown key input from client");
                break;

        }

        var returnMessage: Message = new Message(Constants.MOVEMENT, Constants.PLAYER, message.clientId, { x: targetPlayer.x, y: targetPlayer.y });
        io.sockets.emit("serverInput", returnMessage);
    });


    //Client requests id
    socket.on("clientRequestId", function(data: string) {
        console.log("Client requests id: " + socket.id);
        //Send id and currentWorld to client
        var returnMessage: Message = new Message(Constants.CREATE, Constants.WORLD, socket.id, currentWorld);
        socket.emit("serverAssignId", returnMessage);

        //Add new clients Player
        currentWorld.addPlayer(socket.id, 0, 0);
        //Notify all Clients
        var addedPlayer: ServerPlayer = currentWorld.getPlayer(socket.id);
        var returnMessage: Message = new Message(Constants.CREATE, Constants.PLAYER, addedPlayer.id, { x: addedPlayer.x, y: addedPlayer.y });
        io.sockets.emit("serverInput", returnMessage);

    });


});
