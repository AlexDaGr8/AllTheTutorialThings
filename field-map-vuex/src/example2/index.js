import Vue from 'vue'
import Example2 from './Example2.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(Example2),
  store
}).$mount('#example2')