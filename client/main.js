// Conectar con el servidor de Socket.IO
const socket = io();

// Seleccionar el formulario y la entrada de mensaje
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');

// Escuchar el envío del formulario
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional
    const message = input.value.trim();

    if (message) {
        
        displayMessage(message, 'sent');
        
       
        socket.emit('message', message);
        
      
        input.value = '';
        input.focus();
    }
});

// Escuchar mensajes del servidor y mostrarlos en pantalla
socket.on('message', function (msg) {

    displayMessage(msg, 'received'); 
});

// Función para mostrar el mensaje en pantalla
function displayMessage(msg, type) {
    const newMessage = document.createElement('p');
    newMessage.textContent = msg;
    
    // Añadir la clase de alineación según el tipo
    if (type === 'sent') {
        newMessage.classList.add('right'); 
    } else {
        newMessage.classList.add('left'); 
    }

    messagesContainer.appendChild(newMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; 
}





