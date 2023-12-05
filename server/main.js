var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// Array que guarda los mensajes
var messages = [{
    id: 1,
    texto: "¿Qué pasó muchacho?",
    autor: "Mario Alejandro Lujan Miranda"
}];

// Usamos un middleware para usar elementos estáticos en la sección pública de la aplicación
app.use(express.static('public'));

app.get('/', function (request, response) {
    response.status(200).send('Hola mundo');
});

// De esta forma activamos sockt para que este ecuchando mandamos un mensaje de control por consola para saber que pasa y tenemos que hacer ocn el mensaje venga del navegaor web mediante html u JS
io.on('connection', function (socket) {
    console.log('Alguien se ha conectado con socket');
    // Aqui controlamos los eventos del cliente mediante sockets
    socket.emit('messages', messages);
    // Ahora queremos escuchar los mensajes mandados por el cliente
    socket.on('new-message', function (data) {
        // para poder guardar estos mensajes lo ideal sería en una base de datos
        // para este ejercicio utilizaremos arrays (esto no es bueno en producción)

        // ahora la variable messages no solo tendrá un elemento
        // tendrá todos los que vayan llegando
        messages.push(data);
        // queremos que todos los mensajes se manden a todos los clientes
        io.socket.emit('messages', messages);
    });
});

server.listen(3002, function () {
    console.log(`El servidor esta corriendo en http://localhost:${server.address().port}`);
});