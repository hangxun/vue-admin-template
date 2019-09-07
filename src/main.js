import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ElementUI from 'element-ui'
import commonMethods from './plugins/commonMethods'
import 'element-ui/lib/theme-chalk/index.css'
import './components'
import './style/reset.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(commonMethods)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
