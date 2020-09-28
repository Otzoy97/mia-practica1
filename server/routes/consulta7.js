const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Mostrar consulta 7
 */
app.get("/consulta7", async (req, res) => {
    await execQuery(`SELECT PERSONA.nombre as 'Nombre',
    SUM(DET_TRANS.cantidad * PRODUCTO.precio) as 'Ref.'
    FROM PERSONA INNER JOIN ROL ON PERSONA.idRol = ROL.idRol
    INNER JOIN TRANSACCION ON PERSONA.idPersona = TRANSACCION.idPersona
    INNER JOIN DET_TRANS ON TRANSACCION.idTransaccion = DET_TRANS.idTransaccion
    INNER JOIN PRODUCTO ON DET_TRANS.idProducto = PRODUCTO.idProducto
    INNER JOIN CAT_PRODUCTO ON PRODUCTO.idCategoria = CAT_PRODUCTO.idCategoria
    WHERE ROL.nombre = 'P' AND
    CAT_PRODUCTO.nombre = 'Fresh Vegetables'
    GROUP BY 1
    ORDER BY 2 DESC
    LIMIT 5;`)
        .then((serverResponse) => res.json(serverResponse))
        .catch(e => {
            return res.status(400).json({
                ok: false,
                err: e
            })
        })
})

module.exports = app;