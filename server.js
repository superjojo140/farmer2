var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
app.use(express.static('public')); //Verzeichniss für eigene Scripts zur Verfügung stellen
app.use(express.static('node_modules')); //Verzeichniss für npm librarys zur Verfügung stellen
//Include own Classes
const SMap = require("./serverModel/SMap.js");
const SWorld = require("./serverModel/SWorld.js");
const SPlayer = require("./serverModel/SPlayer.js");
const SMapTile = require("./serverModel/SMapTile.js");
//Gloabal Variables
var users = [];
var connections = [];
//
console.log(SWorld);
var currentWorld = new SWorld("map1");
console.log(currentWorld.clientId);
//
//
//
server.listen(3000);
console.log("Server running on Port 3000");
app.get("/", function (req, res) {
    res.sendFile("index.html");
});
io.sockets.on("connection", function (socket) {
    connections[socket.id] = socket;
    console.log("New Client connected: " + socket.id);
    
    //Disconnect
    socket.on("disconnect", function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Client disconnected");
    });
    //Input from Client
    socket.on("clientInput", function (data) {
        console.log("Client with id " + socket.id + " says: " + data);
        io.sockets.emit("serverInput", data);
    });
    //Client requests id
    socket.on("clientRequestId", function (data) {
        console.log("Client requests id: " + socket.id);
        //Send id and currentWorld to client
        socket.emit("serverAssignId", JSON.stringify({
            id: socket.id,
            world : currentWorld
        }));
        
        //Add new clients Player
        currentWorld.addPlayer(socket.id,0,0);
        for (var i in connections) {

                //Notify all Clients
                connections[i].emit("serverNewPlayer", JSON.stringify({
                    playerId: socket.id,
                    x:0,
                    y:0
                }));

        }
    });
    
    
});
