import Vue from 'vue'

let components = require.context('./', true, /index.vue$/)

components.keys().forEach(c => {
  let csp = c.split('/')
  let name = csp[1]
  let comp = components(c).default || components(c)
  Vue.component(name, comp)
})
