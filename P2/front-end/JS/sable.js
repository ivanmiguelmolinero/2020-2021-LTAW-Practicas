function main() {

    // Obtenemos los audios
    var audioblaster = document.getElementById("audioblaster");
    var audioxiwing = document.getElementById("audioXWing");
    var audiocarrito = document.getElementById("audiocarrito");
    var audiocompra =document.getElementById("audiocompra");

    // Obtenemos los productos
    var blaster = document.getElementById("blaster");
    var xwing = document.getElementById("XWing");

    //Obtengo la caja de búsqueda y el display
    var caja = document.getElementById("caja_busqueda");
    var display = document.getElementById("display");

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

}