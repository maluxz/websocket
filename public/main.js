// Creamos la variable que permitirá al frontend conectarse a nuestro backend
var socket = io.connect('http://192.168.1.100:3002', {'forceNew': true});
// Esto manda al servidor el mensaje de connect y aparece en en console.log
var numMsg;
// El cliente manejará datos mediante mensajes, esto se llamarán eventos y se mostrarán por consola en el navegador
socket.on('messages', function(data){
    console.log(data);
    render(data);
});

socket.on('connected-clients', function(numClients) {
    document.getElementById('clientesConectados').innerHTML = "Conexiones: " + numClients;
    console.log(numClients);
});

function render(data) {
    // Reestructuramos esta seccion para que se maneje el Array
    // elem es un conjunto de cosas
    // con map recorremos el array
    var html = data.map(function(elem, index){
        return(`<div><strong>${elem.autor}</strong>:<em> ${elem.texto}</em></div>`);
    }).join(" ");
    numMsg = data.length;
    document.getElementById('messages').innerHTML = html;
}

// Cada vez que alguien presione el botón enviar en el formulario
// El cliente emite un nuevo mensaje y manda el payload
function addMessage(e) {
    var payload = {
        id: numMsg+1,
        texto: document.getElementById('texto').value,
        autor: document.getElementById('username').value
    };
    socket.emit('new-message', payload);
    document.getElementById('texto').value = "";

    return false;
}