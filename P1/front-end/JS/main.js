function main() {

    // Obtenemos los audios
    var audiosable = document.getElementById("audiosable");
    var audioblaster = document.getElementById("audioblaster");
    var audioxiwing = document.getElementById("audioXWing");

    // Obtenemos los productos
    var sable = document.getElementById("sable");
    var blaster = document.getElementById("blaster");
    var xwing = document.getElementById("XWing");

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

}