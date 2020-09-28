const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Cargar datos a la tabla temporal
 */
app.get("/cargarTemporal", async (req, res) => {
    await execQuery(`DROP TEMPORARY TABLE IF EXISTS temp_table;

    CREATE TEMPORARY TABLE IF NOT EXISTS temp_table(
        nombre_compania VARCHAR(50),
        contacto_compania VARCHAR(50),
        correo_compania VARCHAR(60),
        telefono_compania VARCHAR(15),
        tipo VARCHAR(2),
        nombre VARCHAR(50),
        correo VARCHAR(60),
        telefono VARCHAR(15), 
        fecha_registro DATE,
        direccion VARCHAR(45),
        ciudad VARCHAR(30),
        codigo_postal INT,
        region VARCHAR(30),
        producto VARCHAR(45),
        categoria_producto VARCHAR(30),
        cantidad INT,
        precio_unitario DECIMAL(6,2)
    );
    
    LOAD DATA
        INFILE '/var/lib/mysql-files/DataCenterData.csv'
        INTO TABLE temp_table
        FIELDS TERMINATED BY ';'
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES
        (nombre_compania, 
        contacto_compania,
        correo_compania,
        telefono_compania,
        tipo ,
        nombre ,
        correo ,
        telefono ,
        @var_fecha_registro,
        direccion ,
        ciudad,
        codigo_postal,
        region,
        producto,
        categoria_producto,
        cantidad,
        precio_unitario)
        SET fecha_registro = STR_TO_DATE(@var_fecha_registro, '%e/%m/%Y');`)
        .then(serRes => res.json(serRes))
        .catch(e => {
            return res.status(400).json({
                ok: false,
                err: e
            })
        })
})

module.exports = app;