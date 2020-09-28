const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Mostrar consulta 4
 */
app.get("/consulta4", async (req, res) => {
    await execQuery(`SELECT PERSONA.idPersona as 'No. Cliente', 
    PERSONA.nombre as 'Nombre', 
    COUNT(TRANSACCION.idTransaccion) as 'Cant. de ordenes', 
    SUM(DET_TRANS.cantidad) as 'Total'
    FROM
    ROL INNER JOIN PERSONA ON ROL.idRol = PERSONA.idRol
    INNER JOIN TRANSACCION ON PERSONA.idPersona = TRANSACCION.idPersona
    INNER JOIN DET_TRANS ON TRANSACCION.idTransaccion = DET_TRANS.idTransaccion
    INNER JOIN PRODUCTO ON DET_TRANS.idProducto = PRODUCTO.idProducto
    INNER JOIN CAT_PRODUCTO ON PRODUCTO.idCategoria = CAT_PRODUCTO.idCategoria
    WHERE ROL.nombre = 'C' AND
    CAT_PRODUCTO.nombre = 'Cheese'
    GROUP BY 1, 2
    ORDER BY 4 DESC
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