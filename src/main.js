import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store.js'

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
