var express = require('express');
var app = express();
var server = require('http').Server(app);
// var io = require('socket.io')(server);
var io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['get'],
        allowedHeaders: ["*"],
    }
});

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// Array que guarda los mensajes
var messages = [{
    id: 1,
    texto: "¿Qué pasó muchacho? Pase usted al chat con WebSockets",
    autor: "Mario Lujan"
}];

// Usamos un middleware para usar elementos estáticos en la sección pública de la aplicación
app.use(express.static('public'));

app.get('/', function (request, response) {
    response.status(200).send('Hola mundo');
});

// De esta forma activamos sockt para que este ecuchando mandamos un mensaje de control por consola para saber que pasa y tenemos que hacer ocn el mensaje venga del navegaor web mediante html u JS
io.on('connection', function (socket) {
    // Mensaje especial cuando alguien se conecta
    io.sockets.emit('new-message', messages.push({
        id: messages.length + 1,
        texto: `IP ${socket.handshake.address} se ha conectado al servidor`,
        autor: "Servidor"
    }));

    console.log('Alguien se ha conectado con socket');

    // Ahora queremos escuchar los mensajes mandados por el cliente
    socket.on('new-message', function (data) {
        // para poder guardar estos mensajes lo ideal sería en una base de datos
        // para este ejercicio utilizaremos arrays (esto no es bueno en producción)

        // ahora la variable messages no solo tendrá un elemento
        // tendrá todos los que vayan llegando
        messages.push(data);
        // queremos que todos los mensajes se manden a todos los clientes
        io.sockets.emit('messages', messages);


    });

    // Manejar el evento de desconexión
    socket.on('disconnect', function () {
        // Mensaje especial cuando alguien se desconecta
        messages.push({
            id: messages.length + 1,
            texto: `IP ${socket.handshake.address} se ha desconectado del servidor`,
            autor: "Servidor"
        });

        io.sockets.emit('connected-clients', io.engine.clientsCount);
        io.sockets.emit('messages', messages);
    });
    // Emitir la cantidad de clientes conectados a todos los clientes
    io.sockets.emit('connected-clients', io.engine.clientsCount);

    io.sockets.emit('messages', messages);
    // Aqui controlamos los eventos del cliente mediante sockets
    // socket.emit('messages', messages);
});

server.listen(3002, function () {
    console.log(`El servidor esta corriendo en http://localhost:${server.address().port}`);
});