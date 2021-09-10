import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import store from './config/store'

// importar o Router
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARIO RETIRAR DEPOIS
require('axios').defaults.headers.common['Authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NywibmFtZSI6IkFybGFuIE1hcnJlaXJvIiwiZW1haWwiOiJhcmxhbjIubWFycmVpcm9AZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTYzMTI3MzgxOSwiZXhwIjoxNjMxNTMzMDE5fQ.LBi1AFY3r-lxwnre3-SOt-f5-YDkoHpc_TuTbm3SyQ8'

new Vue({
    store,
    // Configurar o Router
    router,
    render: h => h(App)
}).$mount('#app')