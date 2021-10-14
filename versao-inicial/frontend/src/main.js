import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'

import App from './App'
import './config/msgs'
import './config/bootstrap'
import store from './config/store'

// importar o Router
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARIO RETIRAR DEPOIS
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFybGFuIE1hcnJlaXJvIiwiZW1haWwiOiJ0ZXN0ZUB0ZXN0ZS5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjM0MjE4MzgyLCJleHAiOjE2MzQ0Nzc1ODJ9.GLJrXfLTdnwheFnW7kw8aApkyeCqM2RAYkyPb-fZ0CI'
    // Token User: arlan.marreiro@gmail.com 

new Vue({
    store,
    // Configurar o Router
    router,
    render: h => h(App)
}).$mount('#app')