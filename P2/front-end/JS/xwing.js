function main() {

    // Obtenemos los audios
    var audioblaster = document.getElementById("audioblaster");
    var audiosable = document.getElementById("audiosable");
    var audiocarrito = document.getElementById("audiocarrito");
    var audiocompra =document.getElementById("audiocompra");

    // Obtenemos los productos
    var blaster = document.getElementById("blaster");
    var sable = document.getElementById("sable");
    var carrito = document.getElementById("carrito");
    var compra = document.getElementById("compraya")

    blaster.onmouseover = () => {
        audioblaster.play();
    }

    sable.onmouseover = () => {
        audiosable.play();
    }

    // Activamos el audio al hacer click
    carrito.onclick = () => {
        audiocarrito.play();
    }

    compra.onclick = () => {
        audiocompra.play();
    }
}