const cors = require('cors')
const express = require('express')

// Padrão para utilizar o consign(), que foi importado no index.js 
module.exports = app => {
    app.use(express.json())
    app.use(cors())
}