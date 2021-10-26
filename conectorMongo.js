//Requires
const dbconfig = require("./dbconfig");
var MongoClient = require("mongodb").MongoClient;
//Funciones
function connect(dbname) {
    MongoClient.connect(
        dbconfig.connectionString,
        function (err, server) {
            if (err) throw err;
            let db = server.db(dbname);
            server.close();
            console.log("Connection Successfully");
        }
    );
}

function createColleccion(dbname, collectionName) {
    MongoClient.connect(
        dbconfig.connectionString,
        function (err, server) {
            if (err) throw err;
            console.log("Connection Successfully");
            let db = server.db(dbname);
            db.createCollection(collectionName, function (err, result) {
                if (err) throw err;
                console.log(result);
                server.close();
            });
        }
    );
}

function addDocument(dbname, collectionName, document) {
    MongoClient.connect(
        dbconfig.connectionString,
        function (err, server) {
            if (err) throw err;
            console.log("Connection Successfully");
            let db = server.db(dbname);
            let collection = db.collection(collectionName);
            collection.insertOne(document, function (err, result) {
                if (err) throw err;
                console.log("Record added successfully.");
                console.log(result);
                server.close();
            });
        }
    );
}

function addDocuments(dbname, collectionName, documents) {
    MongoClient.connect(
        dbconfig.connectionString,
        function (err, server) {
            if (err) throw err;
            console.log("Connection Successfully");
            let db = server.db(dbname);
            let collection = db.collection(collectionName);
            collection.insertMany(documents, function (err, result) {
                if (err) throw err;
                console.log("Records added successfully.");
                console.log(result);
                server.close();
            })
        }
    );
}

function findDocuments(dbname, collectionName, filter) {
    MongoClient.connect(
        dbconfig.connectionString,
        function (err, server) {
            if (err) throw err;
            console.log("Connection Successfully");
            let db = server.db(dbname);
            let collection = db.collection(collectionName);
            collection
                .find(filter)
                .toArray(function (err, result) {
                    if (err) throw err;
                    console.log(JSON.stringify(result));
                    server.close();
                });
        }
    );
}


function deleteDocuments(dbname, collectionName, filter) {
    MongoClient.connect(
        dbconfig.connectionString,
        function (err, server) {
            if (err) throw err;
            console.log("Connection Successfully");
            let db = server.db(dbname);
            let collection = db.collection(collectionName);
            collection.deleteMany(filter, function (err, result) {
                if (err) throw err;
                console.log(JSON.stringify(result));
                server.close();
            });
        }
    );
}

module.exports = {
    connect,
    createColleccion,
    addDocument,
    addDocuments,
    findDocuments,
    deleteDocuments
}