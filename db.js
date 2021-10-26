const { Persona } = require("./persona");
const { v4: uuidv4 } = require('uuid');

let db = {}
db = {
    "uid1": new Persona("uid1", "nombre", "apellido", new Date(1992, 2, 28), 1.75),
    "uid2": new Persona("uid2", "Juan Carlos", "Marin", new Date(1999, 6, 17), 1.75),
    "uid3": new Persona("uid3", "Jessica", "Alvarez", new Date(1995, 11, 17), 1.75)
}

function getNewID() {
    return uuidv4();
}

function addPersona(nombre, apellido, fecha_nacimiento, altura) {
    let newID = getNewID();
    let newPersona = new Persona(newID, nombre, apellido, fecha_nacimiento, altura);
    db[newID] = newPersona;
    return newID;
}
function removePersona(id) {
    for (key in db) {
        if (key == id) {
            delete db[id];
            return true;
        }
    }
    return -1;
}
function updatePersona(oldID, nombre, apellido, fecha_nacimiento, altura) {
    for (key in db) {
        if (key == oldID) {
            let updatedPersona = new Persona(oldID, nombre, apellido, fecha_nacimiento, altura);
            db[oldID] = updatedPersona;
            return true;
        }
    }
    return -1;
}
function getPersona(id) {
    for (key in db) {
        if (key == id) {
            return db[id];
        }
    }
    return -1;
}
function getPersonas() {
    listaResultado = [];
    for (key in db) {
        listaResultado.push(db[key]);
    }
    if(listaResultado.length == 0){
        return -1;
    }
    return listaResultado;
}

module.exports = {
    addPersona,//Create
    getPersona,//Read
    updatePersona,//Update
    removePersona,//Delete
    getPersonas
}