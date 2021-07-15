const config = require('../knexfile.js')
const knex = require('knex')(config)

// Para carregar as Migrations automaticas na hora de startar: npm start
// Se tiver muitas migrations e varias tabelas, pode ser que não seja tão produtivo na hora de deixar automatico
knex.migrate.latest([config])

module.exports = knex