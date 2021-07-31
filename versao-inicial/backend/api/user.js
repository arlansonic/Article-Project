const bcrypt = require('bcrypt-nodejs')
    // const { where } = require('../config/db')
    // const express = require('express')    

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async(req, res) => {
        const user = {...req.body }
        if (req.params.id) user.id = req.params.id

        try {
            existsOrError(user.name, 'Nome não informado!')
            existsOrError(user.email, 'E-mail não informado!')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.db('users')
                .where({ email: user.email })
                .first()
            if (!user.id) {
                notExistsOrError(userFromDB, 'Usuario já cadastrado')
            }

        } catch (msg) {
            // Erro 400 erro no Lado do CLiente
            return res.status(400).send(msg)
        }
        // Criptografar a senha do usuario
        user.password = encryptPassword(user.password) //req.password
            // Deletando a confirmação da senha no Banco de Ddos
        delete user.confirmPassword

        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send()) //Deu tudo certo
                .catch(err => res.status(500).send(err)) /*Erro do Lado do Servidor */
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }


    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))

    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))

    }

    return { save, get, getById }
}