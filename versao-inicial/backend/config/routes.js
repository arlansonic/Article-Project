const admin = require('./admin')

module.exports = app => {

    // Autenticação - Url's Publicas
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    // Usuario

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))

    // Categorias

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save))

    // Cuidado com ordem! Tem que vir antes de: /categories/:id
    // Arvore de Array dos Menus
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    // Categorias - Get - Put = Delete
    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))

    // Rotas para os Artigos
    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.articles.get))
        .post(admin(app.api.articles.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.articles.getById)
        .put(admin(app.api.articles.save))
        .delete(admin(app.api.articles.remove)) //Adicionando  ADMIN na rota

    // Rotas Paginação Categorias
    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.articles.getByCategory)
}