function main() {

    // Obtenemos los audios
    var audioxwing = document.getElementById("audioxwing");
    var audiosable = document.getElementById("audiosable");
    var audiocarrito = document.getElementById("audiocarrito");
    var audiocompra =document.getElementById("audiocompra");

    // Obtenemos los productos
    var xwing = document.getElementById("X-Wing");
    var sable = document.getElementById("sable");

    xwing.onmouseover = () => {
        audioxwing.play();
    }

    sable.onmouseover = () => {
        audiosable.play();
    }
}