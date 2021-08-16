import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import store from './config/store'

// importar o Router
import router from './config/router'

Vue.config.productionTip = false

new Vue({
    store,
    // Configurar o Router
    router,
    render: h => h(App)
}).$mount('#app')