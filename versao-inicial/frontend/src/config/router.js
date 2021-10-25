import Vue from 'vue'
import VueRouter from 'vue-router'

// @ importar com Caminho Relativo
import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'

Vue.use(VueRouter) //Usar para Carregar os Imports

const routes = [{
    name: 'home', //Pegando o Home
    path: '/',
    component: Home
}, {
    // Pegando o AdminPages
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
}, {
    // Pegando a Categoria dos Artigos
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}]

// Estanciar o VueRouter
export default new VueRouter({
    mode: 'history', //Url mas compacta
    routes // Carregar a const 'routes'
})