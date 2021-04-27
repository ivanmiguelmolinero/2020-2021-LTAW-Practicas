function main() {

    // Obtenemos los audios
    var audioblaster = document.getElementById("audioblaster");
    var audiosable = document.getElementById("audiosable");

    // Obtenemos los productos
    var blaster = document.getElementById("blaster");
    var sable = document.getElementById("sable");

    blaster.onmouseover = () => {
        audioblaster.play();
    }

    sable.onmouseover = () => {
        audiosable.play();
    }
}