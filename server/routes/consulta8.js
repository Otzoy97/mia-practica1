const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Mostrar consulta 8
 */
app.get("/consulta8", async (req, res) => {
    await execQuery(`(SELECT UBICACION.direccion as 'Dirección', 
    UBICACION.region as 'Región', 
    UBICACION.ciudad as 'Ciudad', 
    UBICACION.codigo_postal as 'Codigo postal',
    SUM(DET_TRANS.cantidad * PRODUCTO.precio) as 'Ref.'
    FROM 
    ROL INNER JOIN PERSONA ON ROL.idRol = PERSONA.idRol
    INNER JOIN UBICACION ON PERSONA.idUbicacion = UBICACION.idUbicacion
    INNER JOIN TRANSACCION ON PERSONA.idPersona = TRANSACCION.idPersona
    INNER JOIN DET_TRANS ON TRANSACCION.idTransaccion = DET_TRANS.idTransaccion
    INNER JOIN PRODUCTO ON DET_TRANS.idProducto = PRODUCTO.idProducto
    WHERE ROL.nombre = 'C' 
    GROUP BY 1, 2, 3, 4, PERSONA.idPersona
    ORDER BY 5 DESC
    LIMIT 5)
    UNION
    (SELECT UBICACION.direccion, 
    UBICACION.region, 
    UBICACION.ciudad, 
    UBICACION.codigo_postal,
    SUM(DET_TRANS.cantidad * PRODUCTO.precio)
    FROM 
    ROL INNER JOIN PERSONA ON ROL.idRol = PERSONA.idRol
    INNER JOIN UBICACION ON PERSONA.idUbicacion = UBICACION.idUbicacion
    INNER JOIN TRANSACCION ON PERSONA.idPersona = TRANSACCION.idPersona
    INNER JOIN DET_TRANS ON TRANSACCION.idTransaccion = DET_TRANS.idTransaccion
    INNER JOIN PRODUCTO ON DET_TRANS.idProducto = PRODUCTO.idProducto
    WHERE ROL.nombre = 'C' 
    GROUP BY 1, 2, 3, 4, PERSONA.idPersona
    ORDER BY 5 ASC
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