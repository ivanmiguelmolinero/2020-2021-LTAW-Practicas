function main() {

    // Obtenemos los audios
    var audiosable = document.getElementById("audiosable");
    var audioblaster = document.getElementById("audioblaster");
    var audioxiwing = document.getElementById("audioXWing");
    var audiocarrito = document.getElementById("audiocarrito");

    // Obtenemos los productos
    var sable = document.getElementById("sable");
    var blaster = document.getElementById("blaster");
    var xwing = document.getElementById("XWing");
    var carrito =document.getElementById("carrito");

    // Activamos la reproducción de los audios al pasar el mouse por encima
    sable.onmouseover = () => {
        audiosable.play();
    }

    blaster.onmouseover = () => {
        audioblaster.play();
    }

    xwing.onmouseover = () => {
        audioxiwing.play();
    }

    // Activamos el audio al hacer click
    carrito.onclick = () => {
        audiocarrito.play();
    }

}