const app = require('express')()
const consign = require('consign')
    // Importando o DB para pegara conexão
const db = require('./config/db')
    // Import MongoDB
const mongoose = require('mongoose')
require('./config/mongodb')

// Deixando disponivel - Já configurado : Fazer os Selects
app.db = db

// Fazer a conexão com o MongoDB => APP
app.mongoose = mongoose

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)

app.listen(3003, () => {
    console.log('Backend Executando....')
})