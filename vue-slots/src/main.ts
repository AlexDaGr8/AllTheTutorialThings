import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('dateFormater', function (value:Date) {
  if (!value) return '';
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return value.toLocaleDateString('en', options);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
