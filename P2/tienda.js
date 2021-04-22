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

let existe_carrito = false;
let username = '';
let nombre = '';

let cookie;

let nuevo_pedido = [];

function add_to_buy(req, res, producto) {
    cookie = req.headers.cookie;

    if (cookie) {
        //-- Obtener un array con todos los pares nombre-valor
        let pares = cookie.split(";");
        
        //-- Recorrer todos los pares nombre-valor
        pares.forEach((element, index) => {
            
            //-- Obtener los nombres y valores por separado
            let [nombre, valor] = element.split('=');
    
            //-- Leer el usuario
            //-- Solo si el nombre es 'user'
            if (nombre.trim() === 'carrito') {
                console.log('COOOOOOOOOOOOOOOOOOOOOOOOOOKIE: ' + element);
                console.log('POOOOOOOOOOOOOOOONGOOOOOOOOOOOOOOOOOOOOO: ' + cookie + ',' + producto);
                res.setHeader('Set-Cookie', element + ',' + producto);
            }
        });
    }
}

//-- Analizar la cookie y devolver el nombre del
//-- usuario si existe, o null en caso contrario
function get_user(req) {

    //-- Leer la Cookie recibida
    cookie = req.headers.cookie;
  
    //-- Hay cookie
    if (cookie) {
      
      //-- Obtener un array con todos los pares nombre-valor
      let pares = cookie.split(";");
      
      //-- Variable para guardar el usuario
      let user;
  
      //-- Recorrer todos los pares nombre-valor
      pares.forEach((element, index) => {
  
        //-- Obtener los nombres y valores por separado
        let [nombre, valor] = element.split('=');
  
        //-- Leer el usuario
        //-- Solo si el nombre es 'user'
        if (nombre.trim() === 'user') {
          user = valor;
        }
      });
  
      //-- Si la variable user no está asignada
      //-- se devuelve null
      return user || null;
    }
}

function get_carrito(req) {
    //-- Leer la Cookie recibida
    cookie = req.headers.cookie;
  
    //-- Hay cookie
    if (cookie) {
      
      //-- Obtener un array con todos los pares nombre-valor
      let pares = cookie.split(";");
      
      //-- Variable para guardar el usuario
      let carrito;
      let sable = '';
      let num_sables = 0;
      let blaster = '';
      let num_blaster = 0;
      let xwing = '';
      let num_xwing = 0;
  
      //-- Recorrer todos los pares nombre-valor
      pares.forEach((element, index) => {
  
        //-- Obtener los nombres y valores por separado
        let [nombre, valor] = element.split('=');
  
        //-- Leer el usuario
        //-- Solo si el nombre es 'user'
        if (nombre.trim() === 'carrito') {
          productos = valor.split(',');
          productos.forEach((producto) => {
            if (producto == 'sable') {
                if (num_sables == 0) {
                    sable = 'Sable láser';
                }
                num_sables += 1; 
            } else if (producto == 'blaster') {
                if (num_blaster== 0) {
                    blaster = 'Bláster';
                }
                num_blaster += 1;
            } else if (producto == 'xwing') {
                if (num_xwing == 0) {
                    xwing = 'X-Wing';
                }
                num_xwing += 1;
            }
          });
          sable += ' x' + num_sables;
          blaster += ' x' + num_blaster;
          xwing += ' x' + num_xwing;
          carrito = sable + '<br>' + blaster + '<br>' + xwing;
        }
      });
  
      //-- Si la variable user no está asignada
      //-- se devuelve null
      return carrito || null;
    }
}

const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = "OK";
    let path = "./front-end";
    let content_type = "text/html";
    let folder_exists = false;

    let user = get_user(req);

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
    } else if (url.pathname == '/procesar') {
        path += '/form1-resp-error.html'
        //-- Leer los parámetros
        username = url.searchParams.get('username');
        nombre = url.searchParams.get('nombre');
        // Leer el fichero JSON
        const  tienda_json = fs.readFileSync(FICHERO_JSON)
        let info_tienda = JSON.parse(tienda_json);
        info_usuarios = info_tienda[1].usuarios;
        info_usuarios.forEach((usuario) => {
            if ((usuario.username == username) && (usuario.nombre == nombre)) {
                path = path.replace("/form1-resp-error.html", "/form1-resp.html");
                user_exists = true;
            }
        });
        console.log("PATH: ", path);
    } else if (url.pathname == '/procesar_pedido') {
        //-- Leer los parámetros
        direccion = url.searchParams.get('dirección');
        tarjeta = url.searchParams.get('número_tarjeta');
        // Leer el fichero JSON
        const  tienda_json = fs.readFileSync(FICHERO_JSON)
        let info_tienda = JSON.parse(tienda_json);
        nuevo_pedido = {
            usuario: get_user(req),
            producto: get_carrito(req),
            cantidad: 1,
            direccion: direccion,
            tarjeta: tarjeta,
        };
        info_tienda[2].pedidos.push(nuevo_pedido);
        //-- Convertir la variable a cadena JSON
        let myJSON = JSON.stringify(info_tienda);
        //-- Actualizar fichero JSON
        fs.writeFileSync(FICHERO_JSON, myJSON);
        //-- Redirigimos a la página de pedido realizado
        path += '/form-compra-resp.html';
    } else if (url.pathname == '/compra_blaster') {
        path += '/blaster.html';
        if (existe_carrito) {
            add_to_buy(req, res, 'blaster');
        } else {
            res.setHeader('Set-Cookie', 'carrito=blaster');
            existe_carrito = true;
        }
    } else if (url.pathname == '/compra_sable') {
        path += '/sable.html';
        if (existe_carrito) {
            add_to_buy(req, res, 'sable');
        } else {
            res.setHeader('Set-Cookie', 'carrito=sable');
            existe_carrito = true;
        }
    } else if (url.pathname == '/compra_xwing') {
        path += '/xwing.html';
        if (existe_carrito) {
            add_to_buy(req, res, 'xwing');
        } else {
            res.setHeader('Set-Cookie', 'carrito=xwing');
            existe_carrito = true;
        }
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
            } else if (path == './front-end/form1-resp.html') {
                data = `${data}`.replace("USERNAME", username);
                data = `${data}`.replace("NOMBRE", nombre);
                res.setHeader('Set-Cookie', "user=" + username);
            } else if (path == './front-end/form-compra-resp.html') {
                data = `${data}`.replace("USUARIO", nuevo_pedido.usuario);
                data = `${data}`.replace("PRODUCTO", nuevo_pedido.producto);
                data = `${data}`.replace("DIRECCIÓN", nuevo_pedido.direccion);
                data = `${data}`.replace("TARJETA", nuevo_pedido.tarjeta);
            } else if ((path == './front-end/main.html') && (user)) {
                let sesion_iniciada = 'Bienvenido/a,<br>' + user; 
                data = `${data}`.replace('<a href="./form1.html">Iniciar sesión</a>', sesion_iniciada);
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