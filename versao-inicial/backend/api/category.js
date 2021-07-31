module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    // Salvar - e Alterar Categoria
    const save = (req, res) => {
        const category = {...req.body }
        if (req.params.id) category.id = req.params.id

        try {
            existsOrError(category.name, 'Nome não informado') //Se existir o nome ta ok - Se não existir vai gerar erro
        } catch (msg) {
            return res.status(400).send(msg)
        }

        // Alterar - Update       

        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err)) //(500)
        } else {
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // Remover

    const remove = async(req, res) => {
        try {
            existsOrError(req.params.id, 'Codigo da Categoria não informada')

            // Verifica se tem Subcategorias
            const subcategory = await app.db('categories')
                .where({ parentId: req.params.id })
            notExistsOrError(subcategory, 'Categoria possui Subcategorias.')

            // Verifica se Artigos Associados
            const articles = await app.db('articles')
                .where({ categoryId: req.params.id })
            notExistsOrError(articles, 'Categoria possui Artigos')

            // Excluir
            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada')
            res.status(204).send()

        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    // Função para retornar Filhos de categorias
    const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)

            // Enquanto existir Parent contininuar mostrando Parent
            while (parent) {
                path = `${parent.name} > ${path}` //Onde mostra a ordenação no FrontEnd de Categorias
                parent = getParent(categories, parent.parentId)
            }

            return {...category, path }
        })

        // Fazer ordenação para mostrar em Ordem Alfabetica
        categoriesWithPath.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }

    // Retornar as Categorias
    const get = (req, res) => {
        app.db('categories')
            .then(categories => res.json(withPath(categories)))
            .catch(err => res.status(500).send(err))
    }

    // Pegar por ID
    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    // Array de categorias em Arvore para aparecer no NetWork

    const toTree = (categories, tree) => {
        if (!tree) tree = categories.filter(c => !c.parentId)
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })

        return tree
    }

    // Retornar para o FrontEnd a Arvore

    const getTree = (req, res) => {
        app.db('categories')
            .then(categories => res.json(toTree(withPath(categories))))
            .catch(err => res.status(500).send(err)) //Caso aja algum erro => 500 Lado do Servidor            
    }

    return { save, remove, get, getById, getTree }
}