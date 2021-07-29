const app = require('express')()
const consign = require('consign')

// Importando o DB para pegara conexão
const db = require('./config/db')

// Deixando disponivel - Já configurado : Fazer os Selects
app.db = db

consign()
    // .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validator.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3001, () => {
    console.log('Backend Executando....')
})