import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import router from './router'

require('dotenv').config()

import './styles/main.css'

Vue.prototype.$axios = axios
Vue.prototype.$axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api/'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
