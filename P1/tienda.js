//-- Importar el módulo HTTP
const http = require('http');
//-- Importar el módulo FS
const fs = require('fs');

const PUERTO = 9000;

let pagina_main;


//-- Realizar la lectura asíncrona
fs.readFile('./front-end/main.html','utf8', (err, data) => {

    //-- Cuando los datos están ya disponibles
    //-- los mostramos en la consola
    console.log("Leyendo página principal...");
    console.log("Lectura completada...");
    pagina_main = data;
});

/*fs.readFile('./front-end/imagenes/deathstar.png', (err, data) => {

    //-- Cuando los datos están ya disponibles
    //-- los mostramos en la consola
    console.log("Leyendo favicon...");
    console.log("Lectura completada...");
    favicon = Image(data);
}); */

const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = "OK";
    let page = String(pagina_main);
    let gg = false;

    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log(url.href);

    if (url.pathname == '/favicon.ico') {
        console.log("Me han pedido el favicon...")
        gg = true;
    //-- Cualquier recurso que no sea la página principal o favicon
    //-- genera un error
    } else if (url.pathname != '/') {
        code = 404;
        code_msg = "Not Found";
        //page = pagina_error;
        console.log("Próximamente se añadirá página de error...")
    }

    //-- Generar la respusta en función de las variables
    //-- code, code_msg y page
    res.statusCode = code;
    res.statusMessage = code_msg;
    if (!gg) {
        res.setHeader('Content-Type','text/html');
        res.write(page);
        res.end();
    } else {
        fs.readFile('./front-end/Imágenes/deathstar.png', (err, data) => {

            //-- Cuando los datos están ya disponibles
            //-- los mostramos en la consola
            console.log("Leyendo favicon...");
            console.log("Lectura completada...");
            res.setHeader('Content-Type','image/png');
            res.write(data);
            res.end();
            console.log("paso") ;
        }); 
    }
    
});

server.listen(PUERTO);

console.log("Servidor de la tienda funcionando. Escuchando en puerto: " + PUERTO);