var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Usamos un middleware para usar elementos estáticos en la sección pública de la aplicación
app.use(express.static('public'));

app.get('/',function(request, response) {
    response.status(200).send('Hola mundo');
});

// De esta forma activamos sockt para que este ecuchando mandamos un mensaje de control por consola para saber que pasa y tenemos que hacer ocn el mensaje venga del navegaor web mediante html u JS
io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con socket');
});

server.listen(3002, function() {
    console.log('El servidor esta corriendo en http://localhost:3002');
});