const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Eliminar modelo
 */
app.get("/eliminarModelo", async (req, res) => {
    await execQuery(`DROP TABLE IF EXISTS DET_TRANS, 
    PRODUCTO, 
    CAT_PRODUCTO,
    TRANSACCION,
    COMPANIA,
    PERSONA,
    UBICACION,
    ROL;`)
        .then(serRes => res.json(serRes))
        .catch(e => {
            return res.status(400).json({
                ok: false,
                err: e
            })
        })
})

module.exports = app;