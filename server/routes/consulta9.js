const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Mostrar consulta 9
 */
app.get("/consulta9", async (req, res) => {
    await execQuery(`SELECT PERSONA.nombre AS 'Proveedor',
    PERSONA.telefono AS 'No. teléfono',
    TRANSACCION.idTransaccion AS 'No. orden',
    SUM(DET_TRANS.cantidad) AS 'Total orden'
    FROM
    ROL INNER JOIN PERSONA ON ROL.idRol = PERSONA.idRol
    INNER JOIN TRANSACCION ON PERSONA.idPersona = TRANSACCION.idPersona
    INNER JOIN DET_TRANS ON TRANSACCION.idTransaccion = DET_TRANS.idTransaccion
    WHERE ROL.nombre = 'P'
    GROUP BY 1, 2, 3
    ORDER BY 4 ASC
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