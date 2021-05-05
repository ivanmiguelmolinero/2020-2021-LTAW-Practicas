//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

const PUERTO = 8080;

const msg_bienvenida = 'Un nuevo padawan ha entrado al templo';
const command_list = '/help, /list, /hello, /date, /music, /img';
let num_users = 0;
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

//-- Variable para distinguir si un usuario está escribiendo
const msg_writing = 'Un usuario está escribiendo...';

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.send('Bienvenido a mi aplicación Web!!!' + '<p><a href="/Chat_client.html">Entrar al chat</a></p>');
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('client'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  console.log('** NUEVA CONEXIÓN **'.yellow);

  //-- Aumentamos el número de usuarios
  num_users += 1;

  //-- Enviamos mensaje de bienvenida
  socket.send('¡¡¡Bienvenido, joven padawan!!!');

  socket.broadcast.emit('message', msg_bienvenida);

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
    //-- Disminiumos el número de usuarios
    num_users -= 1;
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    console.log("Mensaje Recibido!: " + msg.blue);

    if (msg.startsWith('/')) {
        console.log('COMANDO RECIBIDO'.green);
        if (msg == '/help') {
            socket.send('Lista de comandos: ' + command_list);
        } else if (msg == '/list') {
            socket.send('Número de usuarios: ' + num_users);
        } else if (msg == '/hello') {
            socket.send('Servidor: ¡Hola, joven padawan!');
        } else if (msg == '/date') {
            socket.send(hoy.toDateString());
        } else if (msg == '/music') {
            socket.send('music');
        } else if (msg == '/img') {
            io.send('img');
        } else {
            socket.send("Comando incorrecto. Para ver la lista de comandos introduzca '/help'");
        }
    } else if (msg == msg_writing) {
        socket.broadcast.emit('message', msg);
    } else {
        //-- Reenviarlo a todos los clientes conectados
        io.send(msg);
    }
  });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);