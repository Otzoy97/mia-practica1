const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Mostrar consulta 1
 */
app.get("/consulta1", async (req, res) => {
    await execQuery(`SELECT PERSONA.nombre as 'Proveedor',
    PERSONA.telefono as 'Teléfono', 
    TRANSACCION.idTransaccion as 'No. de orden', 
    SUM(DET_TRANS.cantidad * PRODUCTO.precio) as 'Total orden (Q.)'
    FROM 
    ROL INNER JOIN PERSONA ON ROL.idRol = PERSONA.idRol
    INNER JOIN TRANSACCION ON PERSONA.idPersona = TRANSACCION.idPersona
    INNER JOIN DET_TRANS ON TRANSACCION.idTransaccion = DET_TRANS.idTransaccion
    INNER JOIN PRODUCTO ON DET_TRANS.idProducto = PRODUCTO.idProducto
    WHERE ROL.nombre = 'P' 
    GROUP BY 1,2,3
    ORDER BY 4 DESC
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