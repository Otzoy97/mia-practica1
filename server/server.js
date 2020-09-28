const express = require('express')
const app = express()

// Configura las rutas de la aplicación
app.use(require('./routes'))

app.listen(3000)