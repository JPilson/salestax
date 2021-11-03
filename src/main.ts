import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import vuesaxOption from "@/plugins/vuesax";
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.config.productionTip = false
Vue.use(Vuesax, vuesaxOption)
new Vue({
  router,
  store,
  vuetify,

  render: h => h(App)
}).$mount('#app')
