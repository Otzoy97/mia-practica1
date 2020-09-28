const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Mostrar consulta 10
 */
app.get("/consulta10", async (req, res) => {
    await execQuery(`SELECT PERSONA.nombre AS 'Clientes',
    SUM(DET_TRANS.cantidad) AS 'Ref.'
    FROM 
    ROL INNER JOIN PERSONA ON ROL.idRol = PERSONA.idRol
    INNER JOIN TRANSACCION ON PERSONA.idPersona = TRANSACCION.idPersona
    INNER JOIN DET_TRANS ON TRANSACCION.idTransaccion = DET_TRANS.idTransaccion
    INNER JOIN PRODUCTO ON DET_TRANS.idProducto = PRODUCTO.idProducto
    INNER JOIN CAT_PRODUCTO ON PRODUCTO.idCategoria = CAT_PRODUCTO.idCategoria
    WHERE ROL.nombre = 'C' AND
    CAT_PRODUCTO.nombre = 'Seafood'
    GROUP BY 1
    ORDER BY 2 DESC
    LIMIT 10;`)
        .then((serverResponse) => res.json(serverResponse))
        .catch(e => {
            return res.status(400).json({
                ok: false,
                err: e
            })
        })
})

module.exports = app;