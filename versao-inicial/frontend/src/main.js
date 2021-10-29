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
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwibmFtZSI6IkFybGFuIE1hcnJlaXJvIGRlIFNvdXphIE5hc2NpbWVudG8iLCJlbWFpbCI6ImFybGFuLm1hcnJlaXJvQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2MzU0MjQzOTgsImV4cCI6MTYzNTY4MzU5OH0.nhmzYYS_1UhllDFMMtXAtKmFLyTU5uBESLryxaqvjrw'
    // Token User: arlan.marreiro@gmail.com 

new Vue({
    store,
    // Configurar o Router
    router,
    render: h => h(App)
}).$mount('#app')