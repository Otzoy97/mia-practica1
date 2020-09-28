const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Mostrar consulta 6
 */
app.get("/consulta6", async (req, res) => {
    await execQuery(`(SELECT CAT_PRODUCTO.nombre as 'Categoría', 
    SUM(DET_TRANS.cantidad * PRODUCTO.precio) as 'Ref.'
    FROM DET_TRANS INNER JOIN PRODUCTO ON DET_TRANS.idProducto = PRODUCTO.idProducto
    INNER JOIN CAT_PRODUCTO ON PRODUCTO.idCategoria = CAT_PRODUCTO.idCategoria
    GROUP BY 1
    ORDER BY 2 DESC
    LIMIT 1)
    UNION
    (SELECT CAT_PRODUCTO.nombre, SUM(DET_TRANS.cantidad * PRODUCTO.precio)
    FROM DET_TRANS INNER JOIN PRODUCTO ON DET_TRANS.idProducto = PRODUCTO.idProducto
    INNER JOIN CAT_PRODUCTO ON PRODUCTO.idCategoria = CAT_PRODUCTO.idCategoria
    GROUP BY 1
    ORDER BY 2 ASC
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