const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Mostrar consulta 3
 */
app.get("/consulta3", async (req, res) => {
    await execQuery(`(SELECT UBICACION.direccion AS 'Direccion',
    UBICACION.region AS 'Región', 
    UBICACION.ciudad AS 'Ciudad', 
    UBICACION.codigo_postal AS 'Código postal',
    COUNT(TRANSACCION.idTransaccion) AS 'Ref.'
    FROM     
    TRANSACCION INNER JOIN PERSONA ON TRANSACCION.idPersona = PERSONA.idPersona
    INNER JOIN UBICACION ON UBICACION.idUbicacion = PERSONA.idUbicacion
    INNER JOIN ROL ON PERSONA.idRol = ROL.idRol
    WHERE ROL.nombre = 'C'
    GROUP BY 1,2,3,4
    ORDER BY 5 DESC
    LIMIT 1)
    UNION
    (SELECT UBICACION.direccion,
    UBICACION.region, 
    UBICACION.ciudad, 
    UBICACION.codigo_postal,
    COUNT(TRANSACCION.idTransaccion)
    FROM     
    TRANSACCION INNER JOIN PERSONA ON TRANSACCION.idPersona = PERSONA.idPersona
    INNER JOIN UBICACION ON UBICACION.idUbicacion = PERSONA.idUbicacion
    INNER JOIN ROL ON PERSONA.idRol = ROL.idRol
    WHERE ROL.nombre = 'C'
    GROUP BY 1,2,3,4
    ORDER BY 5 ASC
    LIMIT 1);`)
        .then((serverResponse) => res.json(serverResponse))
        .catch(e => {
            return res.status(400).json({
                ok: false,
                err: e
            })
        })
})

module.exports = app;