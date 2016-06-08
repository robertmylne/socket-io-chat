var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// User connects to socket
io.on('connection', function(socket){
    socket.broadcast.emit('user connected', 'a user connected: ' + io.engine.clientsCount);
    console.log('a user connected: ' + io.engine.clientsCount);

    // User disconnects from socket
    socket.on('disconnect', function(){
        console.log('user disconnected: ' + io.engine.clientsCount);
    });

    // Server receives message
    socket.on('chat message', function(msg){
        // Server broadcasts message
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});