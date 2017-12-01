"use strict";


var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
app.use(express.static('client')); //Verzeichniss für eigene Scripts zur Verfügung stellen TODO für webpack anpassen
app.use(express.static('node_modules')); //Verzeichniss für npm librarys zur Verfügung stellen TODO Brauchen wir mit webpack nciht mehr
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
        io.sockets.emit("serverInput", data);
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