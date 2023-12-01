var express = require('express');
var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

app.get('/',function(request, response) {
    response.status(200).send('Hola mundo');
});

server.listen(3002, function() {
    console.log('El servidor esta corriendo en http://localhost:3002');
})