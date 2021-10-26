//Includes
const express = require('express');
const path = require("path");
const bodyparser = require('body-parser');
let db = require("./db");
//Declaracion de variables necesarias
const app = express();
const port = 8080;
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
app.get('/personas', (req, res) => {
    let personas = db.getPersonas();
    if (personas == -1) {
        //Error
        res.status(200);
        res.send({
            response: "error",
            data: "No existen registros en la base de datos."
        });
    } else {
        //devolvemos los elementos
        res.status(200);
        res.send({
            response: "ok",
            data: personas
        });
    }
});

app.get('/persona', (req, res) => {
    let persona = db.getPersona(req.query.id);
    if (persona == -1) {
        //error
        res.status(404);
        res.send({
            response: "error",
            data: "Error, ninguna persona existe con el ID proporcionado."
        });

    } else {
        //ok
        res.status(200);
        res.send({
            response: "ok",
            data: persona
        });
    }
});
app.delete('/persona', (req, res) => {
    let deleted = db.removePersona(req.body.id);
    if(deleted == -1){
        //error
        res.status(400);
        res.send({
            response: "error",
            data: "El objeto persona no se pudo eliminar de la BD"
        });
    }else{
        //ok
        res.status(200);
        res.send({
            response: "ok",
            data: "El objeto persona fue elminado de la BD satisfactoriamente"
        });
    }
});

app.post('/persona', (req, res) => {
    let created = db.addPersona(
        req.body.nombre,
        req.body.apellido,
        req.body.fecha_nacimiento,
        req.body.altura
    );
    if(created == -1){
        //error
        res.status(400);
        res.send({
            response: "error",
            data: "El objeto persona no se pudo crear en la BD"
        });
    }else{
        //ok
        res.status(200);
        res.send({
            response: "ok",
            data: created
        });
    }
});
app.put('/persona', (req, res) => {
    console.log(req.body);
    let updated = db.updatePersona(
        req.body.id,
        req.body.nombre,
        req.body.apellido,
        req.body.fecha_nacimiento,
        req.body.altura
    );
    if(updated == -1){
        //error
        res.status(404);
        res.send({
            response: "error",
            data: "El objeto que intenta actualizar no existe"
        });
    }else{
        //ok
        res.status(200);
        res.send({
            response: "ok",
            data: updated
        });
    }
});
//Levantamiento servidor
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})