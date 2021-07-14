const app = require('express')()
const consign = require('consign')

// Importando o DB para pegara conexão
const db = require('./config/db')

// Deixando disponivel - Já configurado : Fazer os Selects
app.db = db

consign()
    .then('./config/middlewares.js')
    .then('/api')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend Executando....')
})