const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Eliminar tabla temporal
 */
app.get("/eliminarTemporal", async (req, res) => {
    await execQuery(`DROP TEMPORARY TABLE IF EXISTS temp_table;`)
        .then(serRes => res.json(serRes))
        .catch(e => {
            return res.status(400).json({
                ok: false,
                err: e
            })
        })
})

module.exports = app;