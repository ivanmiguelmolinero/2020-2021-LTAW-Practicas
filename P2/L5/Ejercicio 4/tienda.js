//-- Importar el módulo HTTP
const http = require('http');
//-- Importar el módulo FS
const fs = require('fs');

const PUERTO = 9000;

const FICHERO_JSON = './front-end/tienda.json';

const PRODUCTOS_HTML = fs.readFileSync('./front-end/productos.html', 'utf-8');

let info_productos;

const type = {
    "plain": "text/plain",
    "html": "text/html",
    "css": "text/css",
    "js": "text/javascript",
    "gif": "image/gif",
    "jpg": "image/jpg",
    "png": "image/png",
    "mp3": "audio/mpeg3"
};

const folder = ['CSS', 'Imagenes', 'JS'];

const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = "OK";
    let path = "./front-end";
    let content_type = "text/html";
    let folder_exists = false;

    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    const url = new URL(req.url, 'http://' + req.headers['host']);

    if (url.pathname == '/') {
        path += '/main.html';
    } else if (url.pathname == '/favicon.ico') {
        path += '/Imagenes/deathstar.png';
        content_type = "image/png";
    } else if (url.pathname == '/productos') {
        //-- Leer el fichero JSON
        const  tienda_json = fs.readFileSync(FICHERO_JSON)
        let info_tienda = JSON.parse(tienda_json);
        info_productos = info_tienda[0].productos;
        path += '/productos.html';
    } else {
        pathfile = url.pathname.split('/');
        folder.forEach((carpeta) =>{
            if ((pathfile[pathfile.length - 2]) == carpeta) {
                folder_exists = true;
            }
        });
        if (folder_exists){
            url.pathname = '/' + pathfile[pathfile.length - 2] + '/' + pathfile[pathfile.length - 1];
        } else {
            url.pathname = '/' + pathfile[pathfile.length - 1];
        }
        path += url.pathname;
        let ext = path.split('.')[2];
        content_type = type[ext];
    }

    //-- Generar la respusta en función de las variables
    //-- code, code_msg y page
    res.statusCode = code;
    res.statusMessage = code_msg;

    fs.readFile(path, (err, data) => {
        if (err == null) {
            if (path == './front-end/productos.html'){
                let productos = '';
                info_productos.forEach((element, index) =>{
                    productos += ('Producto ' + (index +1) + ': ' + element["nombre"] + '<br>'
                                    + 'Descripción: ' + element["descripcion"] + '<br>'
                                    + 'Stock: ' + element["stock"] + '<br>'
                                    + 'Precio: ' + element["precio"] + '<br><br>');
                });
                data = PRODUCTOS_HTML.replace('Productos', productos);
            }
            console.log("Leyendo archivo", path + "...");
            console.log("Lectura completada...");
            res.setHeader('Content-Type', content_type);
            res.write(data);
            res.end();
        } else {
            res.statusCode = 404;
            res.statusMessage = "Not Found";
            path = './front-end/error404.html';
            console.log("Leyendo archivo", path + "...");
            data = fs.readFileSync(path);
            res.setHeader('Content-Type', 'text/html');
            res.write(data);
            res.end()
        }
    })
    
});

server.listen(PUERTO);

console.log("Servidor de la tienda funcionando. Escuchando en puerto: " + PUERTO);