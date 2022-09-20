import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import SearchComponent from './components/SearchComponent.vue'
Vue.config.productionTip = false
Vue.component('SearchComponent',SearchComponent)
Vue.directive('commaSeperator', {
  bind: function (el, binding, vnode) {
    // code
    el.target.value = el.target.value.replace(",", ".");
  }
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
