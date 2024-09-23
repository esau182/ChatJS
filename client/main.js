// Conectar con el servidor de Socket.IO
const socket = io();

// Seleccionar el formulario y la entrada de mensaje
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');

// Contador para rastrear el número de mensajes enviados por ti mismo
let messageCount = 0;

// Escuchar el envío del formulario
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional
    const message = input.value.trim();

    if (message) {
        // Incrementar el contador de mensajes enviados
        messageCount++;

        // Determinar la clase 'left' o 'right' dependiendo de si el contador es par o impar
        const messageType = (messageCount % 2 === 0) ? 'left' : 'right';
        
        // Mostrar el mensaje en pantalla
        displayMessage(message, messageType);
        
        // Enviar mensaje al servidor para que lo reciban otros clientes
        socket.emit('message', message);
        
        // Limpiar el campo de entrada
        input.value = '';
        input.focus();
    }
});

// Escuchar mensajes del servidor y mostrarlos solo si provienen de otros usuarios
socket.on('message', function (msg) {
    // Mostrar los mensajes recibidos de otros usuarios a la izquierda
    displayMessage(msg, 'received'); 
});

// Función para mostrar el mensaje en pantalla
function displayMessage(msg, type) {
    const newMessage = document.createElement('p');
    newMessage.textContent = msg;
    
    // Añadir la clase de alineación según el tipo
    if (type === 'left') {
        newMessage.classList.add('left');
    } else if (type === 'right') {
        newMessage.classList.add('right');
    } else {
        newMessage.classList.add('received'); // Para los mensajes recibidos de otros usuarios
    }

    messagesContainer.appendChild(newMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Desplazar hacia abajo para ver el último mensaje
}




