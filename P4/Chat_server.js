//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const fs = require('fs');
const ip = require('ip');
//-- Cargar el módulo de electron
const electron = require('electron');


const PUERTO = 8080;

const msg_bienvenida = 'Un nuevo padawan ha entrado al templo';
const msg_despedida = 'Un padawan ha abandonado el templo (no es Ahsoka)';
const command_list = '/help: Muestra la lista de comandos<br>'
                     + '/list: Muestra el número de usuarios conectados<br>'
                     + '/hello: El servidor te saluda<br>'
                     + '/date: Te muestra la fecha actual<br>'
                     + '/music: Pone música de fondo al usuario que lo activa<br>'
                     + '/img: Envía una imagen';
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

//-- Variable para acceder a la ventana principal
//-- Se pone aquí para que sea global al módulo principal
let win = null;

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
    res.send('Bienvenido a mi chat!!!' + '<p><a href="/client/Chat_client.html">Chat</a></p>');
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
  win.webContents.send('print-users', num_users);

  //-- Enviamos mensaje de bienvenida
  socket.send('¡¡¡Bienvenido, joven padawan!!!');

  socket.broadcast.emit('message', msg_bienvenida);

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
    socket.broadcast.emit('message', msg_despedida);
    //-- Disminiumos el número de usuarios
    num_users -= 1;
    win.webContents.send('print-users', num_users);
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    console.log("Mensaje Recibido!: " + msg.blue);

    if (msg.startsWith('/')) {
        console.log('COMANDO RECIBIDO'.green);
        win.webContents.send('print-msg', msg);
        if (msg == '/help') {
            socket.send('Lista de comandos:<br>' + command_list);
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
        win.webContents.send('print-msg', msg);
    }
  });

});

console.log("Arrancando electron...");
electron.app.on('ready', () => {
    //-- Aquí se crea la ventana y se hace lo relacionado con la gui
    //-- Pero el servidor no va aquí dentro, si no fuera, como en la práctica 3
    console.log("Evento Ready!");

    //-- Crear la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 600,   //-- Anchura 
        height: 600,  //-- Altura

        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

  //-- En la parte superior se nos ha creado el menu
  //-- por defecto
  //-- Si lo queremos quitar, hay que añadir esta línea
  //win.setMenuBarVisibility(false)

    //-- Cargar interfaz gráfica en HTML
    win.loadFile("index.html");

    //-- Mandar dirección IP
    ip_addr = 'http://' + ip.address() + ':' + PUERTO;
    win.webContents.send('print-ip', ip_addr);

});

//-- Esperar a recibir los mensajes de botón apretado (Test) del proceso de 
//-- renderizado. Al recibirlos se manda un mensaje a los clientes
electron.ipcMain.handle('test', (event, msg) => {
    console.log("-> Mensaje: " + msg);
    //-- Enviar mensaje de prueba a todos los clientes
    io.send(msg);
});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);