//Variables
const tiempo = 5000;
const msn = "Mensaje prueba"

function resultadoDespuesDeTiempo(msn, milliseconds) {
    return new Promise(function (resolve, reject) {
        try {
            //instrucciones de llamados a BD api etc.
            setTimeout(
                function () {
                    console.log("Termino la Espera");
                    resolve(msn); 
                },
                milliseconds
            );
        } catch (err) {
            reject(err)
        }
    });
}

async function funcionAsincrona() {
    console.log("Empezo el Llamado");
    let result = await resultadoDespuesDeTiempo(msn, tiempo);
    console.log(
        result
    )
    console.log("Termino el Llamado");
}
funcionAsincrona()
