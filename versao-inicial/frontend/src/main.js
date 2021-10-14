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
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NywibmFtZSI6IkFybGFuIE1hcnJlaXJvIiwiZW1haWwiOiJhcmxhbjIubWFycmVpcm9AZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTYzNDIxMzUxOSwiZXhwIjoxNjM0NDcyNzE5fQ.rUBt5QYLcy5Y7xMiPG7-cj9cYHk0in7UGXowZvvISQc'
    // Token User: arlan.marreiro@gmail.com 

new Vue({
    store,
    // Configurar o Router
    router,
    render: h => h(App)
}).$mount('#app')