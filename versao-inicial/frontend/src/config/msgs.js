import Vue from "vue";
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação Realizada com Sucesso' : payload.msg, { type: 'sucess', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Ops.. Erro inesperado.' : payload.msg, { type: 'error', icon: 'times' }
)