import Vue from 'vue'

let components = require.context('./', true, /index.vue$/)

components.keys().forEach(c => {
  let comp = components(c).default || components(c)
  Vue.component(comp.name, comp)
})
