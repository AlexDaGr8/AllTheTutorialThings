import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.filter('camel', (str) => str.toLowerCase().replace(/^\w|\s\w/g, (letter) => letter.toUpperCase()))

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
