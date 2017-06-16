var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
app.use(express.static('public')); //Verzeichniss für eigene Scripts zur Verfügung stellen
app.use(express.static('node_modules')); //Verzeichniss für npm librarys zur Verfügung stellen
var users = [];
var connections = [];


server.listen(3000);
console.log("Server running on Port 3000");


app.get("/", function (req, res) {
    res.sendFile("index.html");
});

io.sockets.on("connection", function (socket) {
    connections.push(socket);
    console.log("New Client connected");

    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'pwd',
        database: 'farmer',
    });

    connection.connect();

    var queryString = 'SELECT * FROM fragen LIMIT 1';

    connection.query(queryString, function (err, rows, fields) {
        if (err) throw err;

        for (var i in rows) {
            console.log('Post Titles: ', rows[i].frage);
        }
    });

    connection.end();

    //Disconnect
    socket.on("disconnect", function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Client disconnected");
    });

    socket.on("send message", function (data) {
        io.sockets.emit("new message", {
            msg: data
        });
    });

    socket.on("sendAnsw", function (data) {
        console.log("Answ");
        answers.push(data);
        var toReturn = {
            text: data,
            color: colors[answers.length % colors.length]
        };
        io.sockets.emit("addAnsw", toReturn);
    });
});
