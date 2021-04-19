function main() {

    // Obtenemos los audios
    var audioblaster = document.getElementById("audioblaster");
    var audioxiwing = document.getElementById("audioXWing");
    var audiocarrito = document.getElementById("audiocarrito");
    var audiocompra =document.getElementById("audiocompra");

    // Obtenemos los productos
    var blaster = document.getElementById("blaster");
    var xwing = document.getElementById("XWing");
    var carrito = document.getElementById("carrito");
    var compra = document.getElementById("compraya")

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

    compra.onclick = () => {
        audiocompra.play();
    }
}