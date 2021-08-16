import Vue from 'vue'
import VueRouter from 'vue-router'

// @ importar com Caminho Relativo
import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'

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
}]

// Estanciar o VueRouter
export default new VueRouter({
    mode: 'history', //Url mas compacta
    routes // Carregar a const 'routes'
})