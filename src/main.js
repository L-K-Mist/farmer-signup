import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import './registerServiceWorker'
import store from './store/store'
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'
//import auth from "@/auth"


//Vue.use(auth)
var processEnv = process.env.VUE_APP_ENV_CALLBACK
console.log('TCL: processEnv', processEnv);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')