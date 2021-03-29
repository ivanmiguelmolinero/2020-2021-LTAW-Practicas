//-- Ejercicio 3: Modificacion del fichero tienda.json

const fs = require('fs');

//-- Nombre del fichero JSON a leer
const FICHERO_JSON = "tienda.json"

//-- Leer el fichero JSON
const  tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);

//-- Recorremos los productos para comprobar el stock original
tienda[0]["productos"].forEach(element => {
    console.log("Producto: " + element.nombre + ", Stock: " + element.stock);
});
console.log();

//-- Aumentar en 1 unidad el stock de todos los productos
tienda[0]["productos"].forEach(element => {
    element["stock"] += 1;
});

//-- Recorremos los productos para comprobar que se ha incrementando el stock correctamente
tienda[0]["productos"].forEach(element => {
    console.log("Producto: " + element.nombre + ", Stock: " + element.stock);
});

//-- Convertir la variable a cadena JSON
let myJSON = JSON.stringify(tienda);

//-- Guardarla en el fichero destino
fs.writeFileSync(FICHERO_JSON, myJSON);

console.log("Información guardada en fichero: " + FICHERO_JSON);