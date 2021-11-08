const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async(req, res) => {
        if (!req.body.email || !req.body.password) { //Se não for preenchido
            return res.status(400).send('Informe Seu E-mail e Senha')
        }

        const user = await app.db('users') //Fazer consulta no Banco
            .where({ email: req.body.email })
            .first()

        if (!user) return res.status(400).send('Usuario não encontrado') // Se não existir Retorne

        const isMatch = bcrypt.compareSync(req.body.password, user.password) //Validar com o User e o password para saber se é o mesmo

        //Se não der Match
        if (!isMatch) return res.status(401).send('Email e Senha Invalidos!')

        // Token vai ter Validade

        const now = Math.floor(Date.now() / 1000)

        // Conteudo do Token JWT
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + 200 //(60 * 60 * 24 * 3) //3 dias ele expira e tem que refazer o login
        }

        // Mandar a reposta
        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret) //Mandar o Token para o usuario
        })
    }

    const validateToken = async(req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {
            // Problema com o token
        }

        res.send(false)
    }

    return { signin, validateToken }
}