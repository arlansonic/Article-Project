// nst { where } = require("../config/db")
module.exports = app => {
    const { existsOrError } = app.api.validator

    // Salvar Artigo
    const save = (req, res) => {
        const article = {...req.body }
        if (req.params.id) article.id = req.params.id

        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição Não informada')
            existsOrError(article.categoryId, 'Categoria não informada')
            existsOrError(article.userId, 'Autor não informado')
            existsOrError(article.content, 'Conteúdo não informado')
        } catch (msg) {
            res.status(400).send(msg) //Erro do lado do FrontEnd
        }

        if (article.id) { // Atualizar
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { //Inserir no Banco
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // Remover os Artigos
    const remove = async(req, res) => {
        try {
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del()
            try {
                existsOrError(rowsDeleted, 'Artigos não foram encontrados')
            } catch (msg) {
                return res.status(400).send(msg)
            }
            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 // Paginação dos Artigos
    const get = async(req, res) => {
        const page = req.query.page || 1 //Pagina 1 padrão

        const result = await app.db('articles').count('id').first() //Contador de elementos por pagina - Pegar o primeiro registro
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit) //1 * 10 - 10 - Deslocamento de pagina
            .then(articles => res.json({ data: articles, count, limit })) //Paginador no FrontEnd -Faz 1 requisição vem no Data em uma unica chamada
            .catch(err => res.status(500).send(err))
    }

    // Pegar pelo Identificador
    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById }
}