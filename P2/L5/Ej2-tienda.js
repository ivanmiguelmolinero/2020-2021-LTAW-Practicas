//-- Ejercicio 2: Estructura del fichero JSON

const fs = require('fs');

//-- Nombre del fichero JSON a leer
const FICHERO_JSON = "tienda.json"

//-- Leer el fichero JSON
const  tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

//-- Mostrar informacion sobre la tienda
//-- Mostrar información sobre los usuarios
const usuarios = tienda[1]["usuarios"];
console.log("Usuarios registrados: " + usuarios.length);

//-- Mostrar información de los usuarios
usuarios.forEach((element, index)=>{
    console.log("Username: " + (index + 1) + ": " + element["username"]
                + ", Nombre real: " + element["nombre"]);
});
console.log();

//-- Mostrar información de los productos
const productos = tienda[0]["productos"];
console.log("Productos en la tienda: " + productos.length);

//-- Recorrer el array de productos
productos.forEach((element, index)=>{
  console.log("Producto: " + (index + 1) + ": " + element["nombre"]
              + ", Descripción: " + element["descripcion"]
              + ", Stock: " + element["stock"]);
});
console.log();

//-- Mostrar información de los pedidos
const pedidos = tienda[2]["pedidos"];
console.log("Pedidos en la tienda: " + pedidos.length);

//-- Recorrer el array de pedidos
pedidos.forEach((element, index)=>{
  console.log("Pedido: " + (index + 1) + ": \nA nombre de: " + element["usuario"]
              + "\nProducto pedido: " + element["producto"]
              + "\nCantidad: " + element["cantidad"]);
});