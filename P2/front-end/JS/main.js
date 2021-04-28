function main() {

    // Obtenemos los audios
    var audiosable = document.getElementById("audiosable");
    var audioblaster = document.getElementById("audioblaster");
    var audioxiwing = document.getElementById("audioXWing");

    // Obtenemos los productos
    var sable = document.getElementById("sable");
    var blaster = document.getElementById("blaster");
    var xwing = document.getElementById("XWing");

    // Obtengo el banner
    var banner = document.getElementById("img");
    var section_banner = document.getElementById("banner");

    //Obtengo la caja de búsqueda y el display
    var caja = document.getElementById("caja_busqueda");
    var display = document.getElementById("display");

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

    //-- Retrollamda del boton de Ver productos
    caja.oninput = () => {

        //-- Crear objeto para hacer peticiones AJAX
        const m = new XMLHttpRequest();

        //-- Función de callback que se invoca cuando
        //-- hay cambios de estado en la petición
        m.onreadystatechange = () => {

            //-- Petición enviada y recibida. Todo OK!
            if (m.readyState==4) {

                //-- Solo la procesamos si la respuesta es correcta
                if (m.status==200) {

                    //-- La respuesta es un objeto JSON
                    let productos = JSON.parse(m.responseText)

                    console.log(productos);

                    //-- Borrar el resultado anterior
                    display.innerHTML = "";

                    //--Recorrer los productos del objeto JSON
                    for (let i=0; i < productos.length; i++) {

                        //-- Añadir cada producto al párrafo de visualización
                        display.innerHTML += productos[i];

                        //-- Separamos los productos por ',''
                        if (i < productos.length-1) {
                        display.innerHTML += '<br>';
                        }
                    }

                } else {
                    //-- Hay un error en la petición
                    //-- Lo notificamos en la consola y en la propia web
                    console.log("Error en la petición: " + m.status + " " + m.statusText);
                }
            }
        }

        console.log(caja.value.length);

        //-- La peticion se realia solo si hay al menos 1 carácter
        if (caja.value.length >= 1) {

        //-- Configurar la petición
        m.open("GET","/productos?param1=" + caja.value, true);

        //-- Enviar la petición!
        m.send();
        
        } else {
            display.innerHTML="";
        }
    }

    // Activamos temporizador para que cada 10 segundos cambie la imagen del banner
    setTimeout( () =>{
        banner.src = "./Imagenes/Banner.png";
        section_banner.style.backgroundColor = "#1f1f1f";
        let imagen1 = setInterval( () => {
            banner.src = "./Imagenes/Banner.png";
            section_banner.style.backgroundColor = "#1f1f1f";
        }, 20000);
    }, 10000);

    let imagen2 = setInterval( () => {
        banner.src = "./Imagenes/banner2.jpg";
        section_banner.style.backgroundColor = "black";
    }, 20000);

}