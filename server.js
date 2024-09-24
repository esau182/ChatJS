// Importar las dependencias
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Inicializar la aplicación
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;

// Servir archivos estáticos desde la carpeta "client"
app.use(express.static('client'));

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

// Configurar Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Escuchar los mensajes enviados por el cliente
    socket.on('message', (msg) => {
      console.log('Message received:', msg);
      socket.broadcast.emit('message', msg);
    });
  
    // Desconexión de usuario
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



