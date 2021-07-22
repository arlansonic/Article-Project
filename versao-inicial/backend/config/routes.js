module.exports = app => {
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

    app.route('/categories/:id')
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

}