const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Eliminar modelo
 */
app.get("/eliminarModelo", async (req, res) => {
    await execQuery(`DROP TABLE IF EXISTS DET_TRANS;
    DROP TABLE IF EXISTS PRODUCTO;
    DROP TABLE IF EXISTS CAT_PRODUCTO;
    DROP TABLE IF EXISTS COMPANIA;
    DROP TABLE IF EXISTS UBICACION;
    DROP TABLE IF EXISTS ROL;
    DROP TABLE IF EXISTS PERSONA;
    DROP TABLE IF EXISTS TRANSACCION;`)
        .then(serRes => res.json(serRes))
        .catch(e => {
            return res.status(400).json({
                ok: false,
                err: e
            })
        })
})

module.exports = app;