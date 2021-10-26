//Requires
const dbconfig = require("./dbconfig");
var MongoClient = require("mongodb").MongoClient;

//Funciones
async function getConnection() {
    return MongoClient.connect(dbconfig.connectionString);
}

async function getCollection(dbName, collectionName) {
    var server = await getConnection();
    let db = server.db(dbName);
    return db.collection(collectionName);
}

async function findDocuments(dbname, collectionName, filter) {
    var collection = await getCollection(dbname, collectionName);
    //llamados de busqueda
    var cursor = collection.find(filter);
    var result = [];
    var condition = await cursor.next();
    while (condition != null) {
        result.push(condition);
        condition = await cursor.next();
    }
    return result;
}

async function insertDocuments(dbName, collectionName, documents){
    var collection = await getCollection(dbName, collectionName);
    var inserResult = await collection.insertMany(documents);
    return inserResult;
}

async function deleteDocuments(dbName, collectionName, filter){
    var collection = await getCollection(dbName, collectionName);
    let result = await collection.deleteMany(filter);
    return result;
}

async function insertDocument(dbName, collectionName, document){
    var collection = await getCollection(dbName, collectionName);
    var result = await collection.insertOne(document);
    return result;
}

async function updateDocuments(dbName, collectionName, filter, updateFields){
    var collection = await getCollection(dbName, collectionName);
    var result = await collection.updateMany(filter, updateFields);
    return result;
}

module.exports = {
    findDocuments,
    insertDocuments,
    deleteDocuments,
    insertDocument,
    updateDocuments
}