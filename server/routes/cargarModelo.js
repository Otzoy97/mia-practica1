const express = require('express')
const execQuery = require('../../db/connection')
let app = express();

/**
 * Crear tablas y cargar info desde temp_table
 */
app.get("/cargarModelo", async (req, res) => {
    await execQuery(`DROP TABLE IF EXISTS DET_TRANS, PRODUCTO, CAT_PRODUCTO, COMPANIA, ROL, UBICACION, PERSONA, TRANSACCION;
    
    CREATE TABLE IF NOT EXISTS COMPANIA (
        idCompania INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        contacto VARCHAR(50) NOT NULL,
        correo VARCHAR(60) NOT NULL,
        telefono VARCHAR(15) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS UBICACION(
        idUbicacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        region VARCHAR(30) NOT NULL,
        ciudad VARCHAR(30) NOT NULL,
        codigo_postal INTEGER NOT NULL,
        direccion VARCHAR(45) NOT NULL
    );    
    
    CREATE TABLE IF NOT EXISTS ROL (
        idRol INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(12) NOT NULL
    );
        
    CREATE TABLE IF NOT EXISTS PERSONA( 
        idPersona INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        correo VARCHAR(60) NOT NULL,
        telefono VARCHAR(15) NOT NULL,
        fecha_registro DATE NOT NULL,
        idRol INT NOT NULL,
        idUbicacion INT NOT NULL,
        FOREIGN KEY (idRol) REFERENCES ROL(idRol),
        FOREIGN KEY (idUbicacion) REFERENCES UBICACION(idUbicacion)
    );
    
    CREATE TABLE IF NOT EXISTS CAT_PRODUCTO(
        idCategoria INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(30) NOT NULL
    );    
    
    CREATE TABLE IF NOT EXISTS PRODUCTO(
        idProducto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(45) NOT NULL,
        precio DECIMAL(5,2) NOT NULL,
        idCategoria INT NOT NULL,
        FOREIGN KEY (idCategoria) REFERENCES CAT_PRODUCTO(idCategoria)
    );    
    
    CREATE TABLE IF NOT EXISTS TRANSACCION(
        idTransaccion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        idPersona INT NOT NULL,
        idCompania INT NOT NULL,
        FOREIGN KEY (idCompania) REFERENCES COMPANIA(idCompania),
        FOREIGN KEY (idPersona) REFERENCES PERSONA(idPersona)
    );
        
    CREATE TABLE IF NOT EXISTS DET_TRANS(
        idTransaccion INT NOT NULL,
        idProducto INT NOT NULL,
        cantidad INT NOT NULL,
        -- PRIMARY KEY (idTransaccion, idProducto),
        FOREIGN KEY (idTransaccion) REFERENCES TRANSACCION(idTransaccion),
        FOREIGN KEY (idProducto) REFERENCES PRODUCTO(idProducto)
    );
    -- ------------------------------
    -- TABLA COMPANIA
    -- ------------------------------
    INSERT INTO COMPANIA(nombre, contacto, correo, telefono)
    SELECT DISTINCT(nombre_compania), contacto_compania, correo_compania, telefono_compania FROM temp_table;
    -- ------------------------------
    -- TABLA UBCACION
    -- ------------------------------
    INSERT INTO UBICACION(codigo_postal, region, ciudad, direccion)
    SELECT DISTINCT(codigo_postal), region, ciudad, direccion
    FROM temp_table;
    -- ------------------------------
    -- TABLA ROL
    -- ------------------------------
    INSERT INTO ROL(nombre)
    SELECT DISTINCT(tipo) 
    FROM temp_table;
    -- ------------------------------
    -- TABLA PERSONA
    -- ------------------------------
    INSERT INTO PERSONA(nombre, correo, telefono, fecha_registro, idRol, idUbicacion)
    SELECT DISTINCT(temp_table.nombre), temp_table.correo, temp_table.telefono, temp_table.fecha_registro, ROL.idRol, UBICACION.idUbicacion
    FROM temp_table, ROL, UBICACION
    WHERE UBICACION.codigo_postal = temp_table.codigo_postal AND
    ROL.nombre = temp_table.tipo;
    -- ------------------------------
    -- TABLA CAT_PRODUCTO
    -- ------------------------------
    INSERT INTO CAT_PRODUCTO(nombre) 
    SELECT DISTINCT(categoria_producto)
    FROM temp_table;
    -- ------------------------------
    -- TABLA PRODUCTO
    -- ------------------------------
    INSERT INTO PRODUCTO(nombre, precio, idCategoria)
    SELECT DISTINCT(temp_table.producto), temp_table.precio_unitario, CAT_PRODUCTO.idCategoria
    FROM temp_table, CAT_PRODUCTO
    WHERE temp_table.categoria_producto = CAT_PRODUCTO.nombre;
    -- ------------------------------
    -- TABLA TRANSACCION
    -- ------------------------------
    INSERT INTO TRANSACCION(idPersona, idCompania)
    SELECT DISTINCT(PERSONA.idPersona), COMPANIA.idCompania
    FROM PERSONA, COMPANIA, temp_table
    WHERE temp_table.nombre = PERSONA.nombre AND
    temp_table.nombre_compania = COMPANIA.nombre
    -- ------------------------------
    -- TABLA DET_TRANS
    -- ------------------------------
    INSERT INTO DET_TRANS(idTransaccion, idProducto, cantidad)
    SELECT TRANSACCION.idTransaccion, PRODUCTO.idProducto, temp_table.cantidad
    FROM TRANSACCION, temp_table, PERSONA, COMPANIA, PRODUCTO
    WHERE TRANSACCION.idPersona = PERSONA.idPersona AND
    PERSONA.nombre = temp_table.nombre AND
    TRANSACCION.idCompania = COMPANIA.idCompania AND
    COMPANIA.nombre = temp_table.nombre_compania AND
    PRODUCTO.nombre = temp_table.producto;`)
        .then(serRes => res.json(serRes))
        .catch(e => {
            return res.status(400).json({
                ok: false,
                err: e
            })
        })
})