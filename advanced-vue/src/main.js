import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueLodash from 'vue-lodash'

Vue.use(VueLodash);

Vue.config.productionTip = false

Vue.directive('test', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.style.color = 'white';
    el.style.background = 'blue';
     var Base64 = {
                _keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encode:function(e){
                        var t="";
                        var n,r,i,s,o,u,a;
                        var f=0;e=Base64._utf8_encode(e);
                        while(f<e.length){n=e.charCodeAt(f++);
                                r=e.charCodeAt(f++);
                                i=e.charCodeAt(f++);
                                s=n>>2;o=(n&3)<<4|r>>4;
                                u=(r&15)<<2|i>>6;a=i&63;
                                if(isNaN(r)){u=a=64}else if(isNaN(i)){
                                        a=64
                                }
                                t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)
                        }
                        return t
                },
                _utf8_encode:function(e){
                        e=e.replace(/rn/g,"n");
                        var t="";
                        for(var n=0;n<e.length;n++){
                                var r=e.charCodeAt(n);
                                if(r<128){
                                        t+=String.fromCharCode(r)
                                }else if(r>127&&r<2048){
                                        t+=String.fromCharCode(r>>6|192);
                                        t+=String.fromCharCode(r&63|128)
                                }else{
                                        t+=String.fromCharCode(r>>12|224);
                                        t+=String.fromCharCode(r>>6&63|128);
                                        t+=String.fromCharCode(r&63|128)
                                }
                        }
                        return t
                }
                
        }
    el.innerHTML = Base64.encode(el.innerHTML);
  }
});

Vue.filter('camel', function(str) {
  return str
  .replace(/((?<=[a-z])[A-Z]|[A-Z](?=[a-z]))/g, (letter) => " " + letter)
  .toLowerCase().replace(/^\w|\s\w/g, function (letter) {
    return letter.toUpperCase();
  })
})

Vue.filter('test', function(str) {
        console.log('str', str)
        return 'hi';
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
