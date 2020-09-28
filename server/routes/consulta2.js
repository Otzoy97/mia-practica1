const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Mostrar consulta 2
 */
app.get("/consulta2", async (req, res) => {
    await execQuery(`SELECT PERSONA.idPersona as 'No. Cliente',
    PERSONA.nombre as 'Cliente',
    SUM(DET_TRANS.cantidad) as 'Total productos'
    FROM
    ROL INNER JOIN PERSONA ON ROL.idRol = PERSONA.idRol
    INNER JOIN TRANSACCION ON PERSONA.idPersona = TRANSACCION.idPersona
    INNER JOIN DET_TRANS ON TRANSACCION.idTransaccion = DET_TRANS.idTransaccion
    WHERE ROL.nombre = 'C' 
    GROUP BY 1,2
    ORDER BY 3 DESC
    LIMIT 1;`)
        .then((serverResponse) => res.json(serverResponse))
        .catch(e => {
            return res.status(400).json({
                ok: false,
                err: e
            })
        })
})

module.exports = app;