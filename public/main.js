// Creamos la variable que permitirá al frontend conectarse a nuestro backend
var socket = io.connect('http://localhost:3002', ('forceNew': true));
// Esto manda al servidor el mensaje de connect y aparece en en console.log

// El cliente manejará datos mediante mensajes, esto se llamarán eventos y se mostrarán por consola en el navegador
socket.on('messages', function(data){
    console.log(data);
});