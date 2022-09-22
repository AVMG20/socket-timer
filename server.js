const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

let timerData = {
    interval: 0,
    now: 0,
    start: 0,
    stop: 0,
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});


io.on('connection', (socket) => {
    console.log('a user connected');

    //set initial timer data
    socket.emit('connected', timerData);


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('start', (data) => {
        console.log('socket start');
        socket.broadcast.emit('start', data);
    });

    socket.on('stop', (data) => {
        console.log('socket stop');
        setTimerData(data);
        socket.broadcast.emit('stop', data);
    });

    socket.on('continue', (data) => {
        console.log('socket continue');
        socket.broadcast.emit('continue', data);
    });

    socket.on('reset', (data) => {
        console.log('socket reset');
        setTimerData(data);
        socket.broadcast.emit('reset', data);
    });

});

function setTimerData(data){
    timerData = data;
}