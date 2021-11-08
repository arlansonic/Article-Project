import Vue from 'vue'
import VueRouter from 'vue-router'

// @ importar com Caminho Relativo
import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleByid from '@/components/article/ArticleByid'
import Auth from '@/components/auth/Auth'

import { userKey } from '@/global'

// Rotas
Vue.use(VueRouter) //Usar para Carregar os Imports

const routes = [{
    name: 'home', //Pegando o Home
    path: '/',
    component: Home
}, {
    // Pegando o AdminPages
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    // Pegando a Categoria dos Artigos
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleByid
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}]

// Estanciar o VueRouter
const router = new VueRouter({
    mode: 'history', //Url mas compacta
    routes // Carregar a const 'routes'
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router