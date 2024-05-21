import Vue from 'vue'
import Example1 from './Example1.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(Example1),
  store
}).$mount('#example1')
