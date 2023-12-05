// Creamos la variable que permitirá al frontend conectarse a nuestro backend
var socket = io.connect('http://localhost:3002', {'forceNew': true});
// Esto manda al servidor el mensaje de connect y aparece en en console.log

// El cliente manejará datos mediante mensajes, esto se llamarán eventos y se mostrarán por consola en el navegador
socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data) {
    // Aqui se inicia el manejo de string que viene en EM6 se usan estas comillas
    // Las variables se colocan con el signo de $ y entre {}
    var html = `<div><strong>${data.autor}</strong>:<em>${data.texto}</em></div>`;

    document.getElementById('messages').innerHTML = html;
}

// Cada vez que alguien presione el botón enviar en el formulario
// El cliente emite un nuevo mensaje y manda el payload
function addMessage(e) {
    var payload = {
        autor: document.getElementById(username).value,
        texto: document.getElementById(texto).value
    };
    socket.emit('new-message', payload);
    return false;
}