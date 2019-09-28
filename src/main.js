import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Fragment from 'vue-fragment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './components'
import './style/reset.css'

// 自定义插件
import methods from './plugins/methods'
import directive from './plugins/directive'

Vue.config.productionTip = false

Vue.use(Fragment.Plugin)
Vue.use(ElementUI)
Vue.use(methods)
Vue.use(directive)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
