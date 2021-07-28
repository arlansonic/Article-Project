module.exports = app => {

    // Autenticação - Url's Publicas
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    // Usuario

    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)

    // Categorias

    app.route('/categories')
        .get(app.api.category.get)
        .post(app.api.category.save)

    // Cuidado com ordem! Tem que vir antes de: /categories/:id
    // Arvore de Array dos Menus
    app.route('/categories/tree')
        .get(app.api.category.getTree)
        // Categorias - Get - Put = Delete
    app.route('/categories/:id')
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

    // Rotas para os Artigos
    app.route('/articles')
        .get(app.api.articles.get)
        .post(app.api.articles.save)

    app.route('/articles/:id')
        .get(app.api.articles.getById)
        .put(app.api.articles.save)
        .delete(app.api.articles.remove)

    // Rotas Paginação Categorias
    app.route('/categories/:id/articles')
        .get(app.api.articles.getByCategory)
}