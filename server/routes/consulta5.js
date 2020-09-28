const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Mostrar consulta 5
 */
app.get("/consulta5", async (req, res) => {
    await execQuery(`(SELECT MONTH(PERSONA.fecha_registro) as 'Número de mes',
    PERSONA.nombre as 'Nombre', 
    SUM(PRODUCTO.precio * DET_TRANS.cantidad) as 'Ref.'
    FROM PERSONA INNER JOIN ROL ON PERSONA.idRol = ROL.idRol
    INNER JOIN TRANSACCION ON PERSONA.idPersona = TRANSACCION.idPersona
    INNER JOIN DET_TRANS ON TRANSACCION.idTransaccion = DET_TRANS.idTransaccion
    INNER JOIN PRODUCTO ON DET_TRANS.idProducto = PRODUCTO.idProducto
    WHERE ROL.nombre = 'C'
    GROUP BY 1,2
    ORDER BY 3 DESC
    LIMIT 5)
    UNION
    (SELECT MONTH(PERSONA.fecha_registro),
    PERSONA.nombre, SUM(PRODUCTO.precio * DET_TRANS.cantidad)
    FROM PERSONA INNER JOIN ROL ON PERSONA.idRol = ROL.idRol
    INNER JOIN TRANSACCION ON PERSONA.idPersona = TRANSACCION.idPersona
    INNER JOIN DET_TRANS ON TRANSACCION.idTransaccion = DET_TRANS.idTransaccion
    INNER JOIN PRODUCTO ON DET_TRANS.idProducto = PRODUCTO.idProducto
    WHERE ROL.nombre = 'C'
    GROUP BY 1,2
    ORDER BY 3 ASC
    LIMIT 5);`)
        .then((serverResponse) => res.json(serverResponse))
        .catch(e => {
            return res.status(400).json({
                ok: false,
                err: e
            })
        })
})

module.exports = app;