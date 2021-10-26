//Includes
const express = require('express');
const path = require("path");
const bodyparser = require('body-parser');
var conectorAsync = require("./conector_async");
var ObjectId = require("mongodb").ObjectId;
//Declaracion de variables necesarias
const app = express();
const port = 8080;
const dbName = "mydb";
const collectionName = "coleccionprueba";
//Inicializacion de peticiones
app.use(
    bodyparser.json()
);
app.use(
    bodyparser.urlencoded({ extended: true })
);
app.use(function (req, res, next) {
    console.log("Peticion a:" + req.url + "|method: " + req.method);
    next();
});
app.get('/', (req, res) => {
    res.sendFile(path.resolve("./testAPI.html"));
})

//Registro de enrutado
app.get('/personas', async (req, res) => {
    try {
        let personas = await conectorAsync.findDocuments(
            dbName,
            collectionName,
            {}
        );
        if (personas.length == 0) {
            res.status(404);
            res.send({
                response: "ok",
                data: "No existen registros en la base de datos."
            });
        } else {
            res.status(200);
            res.send({
                response: "ok",
                data: personas
            });
        }
    } catch (err) {
        res.status(500);
        res.send({
            response: "err",
            data: err
        });
    }
});

app.get('/persona', async (req, res) => {
    try {
        let persona = await conectorAsync.findDocuments(
            dbName,
            collectionName,
            {
                _id: new ObjectId(req.query.id)
            }
        )
        if (persona.length > 0) {
            res.status(200);
            res.send({
                response: "ok",
                data: persona
            });
        } else {
            res.status(404);
            res.send({
                response: "ok",
                data: persona
            });
        }
    } catch (err) {
        res.status(500);
        res.send({
            response: "error",
            data: err
        });
    }
});

app.delete('/persona', async (req, res) => {
    try {
        let deleted = await conectorAsync.deleteDocuments(
            dbName,
            collectionName,
            {
                _id: new ObjectId(req.body.id)
            }
        );
        if (deleted.deletedCount > 0) {
            res.status(200);
            res.send({
                response: "ok",
                data: deleted
            });
        } else {
            res.status(404);
            res.send({
                response: "ok",
                data: deleted
            });
        }
    } catch (err) {
        res.status(500);
        res.send({
            response: "error",
            data: err
        });
    }
});

app.post('/persona', async (req, res) => {
    try {
        let created = await conectorAsync.insertDocument(
            dbName,
            collectionName,
            {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                fecha_nacimiento: req.body.fecha_nacimiento,
                altura: req.body.altura,
            }
        )
        if (created.insertedId.id != null) {
            res.status(200);
            res.send({
                response: "ok",
                data: created
            });
        } else {
            res.status(401);
            res.send({
                response: "error",
                data: created
            });
        }
    } catch (err) {
        res.status(500);
        res.send({
            response: "error",
            data: err
        });
    }
});

app.put('/persona', async (req, res) => {
    console.log(req.body);
    try{
        let updated = await conectorAsync.updateDocuments(
            dbName,
            collectionName,
            {
                _id: new ObjectId(req.body.id)
            },
            {
                $set: {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    fecha_nacimiento: req.body.fecha_nacimiento,
                    altura: req.body.altura
                }
            }
        );
        res.status(200);
        res.send({
            response: "ok",
            data: updated
        });
    }catch(err){
        res.status(500);
        res.send({
            response: "ok",
            data: err
        });
    }
});
//Levantamiento servidor
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})