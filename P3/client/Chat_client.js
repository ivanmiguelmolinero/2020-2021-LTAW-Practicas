//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const audio_msg = document.getElementById("audio_msg");
const music = document.getElementById("music");

//-- Variable para distinguir si un usuario está escribiendo
const msg_writing = 'Un usuario está escribiendo...';
let writing = false;

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

socket.on("message", (msg)=>{
  if (msg == 'music') {
    music.play();
  } else if (msg == 'img') {
    display.innerHTML += '<img src="./icono.png" alt="Imagen recibida">';
    audio_msg.play();
  } else {
    display.innerHTML += '<p style="color:blue">' + msg + '</p>';
    if (msg != msg_writing) {
      audio_msg.play();
    }
  }
  
});
//-- Al escribir se manda a los demás que un usuario está escribiendo
msg_entry.oninput = () => {
  if (!writing) {
    socket.send(msg_writing);
    writing = true;
  }
  
}
//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value)
    socket.send(msg_entry.value);
    writing = false;
  
  //-- Borrar el mensaje actual
  msg_entry.value = "";
}