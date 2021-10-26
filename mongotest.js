//requires
const cliente = require("./conector_async");
const dbConfig = require("./dbconfig");
const data = require("./datos");
//inicializacion de variables
const dbname = "mydb";
const collectionName = "coleccionprueba";
//Ejecucion de funciones

//cliente.createColleccion(dbConfig.dbName, collectionName);
// let document = {
//     nombre: "Nombre Almacenado",
//     numero: 156
// }
// for(index in data.datos){
//     cliente.addDocument(dbConfig.dbName, collectionName, data.datos[index])   
// }
//cliente.addDocuments(dbConfig.dbName, collectionName, data.datos);
cliente.insertDocuments(
    dbname,
    collectionName,
    data.datos
)
//Filter
// let filter = {
//     latitude: -77.582068,
//     longitude: -130.133238
// };
// let filter = {
//     name: { $regex: "^c", $options: "i" }
// };
// let filter = {
//     $where : " this.latitude > 0 "
// };
// cliente.findDocuments(dbConfig.dbName, collectionName, filter);
// cliente.deleteDocuments(dbConfig.dbName, collectionName, filter);