const express = require('express')
const cors = require('cors')
const app = express()

// lectura y parseo de body

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
require('dotenv').config()

// cors
app.use(cors())

// directorio publico
app.use(express.static('public'))

// Rutas
app.use('/', require('./routes/api'))

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Escuchando puerto ${process.env.PORT}`)
})
