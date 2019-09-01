import Vue from 'vue'

let requireComponent = require.context('./', true, /index.vue$/)

let reg = /\.\/(\S+)\/index\.vue$/

requireComponent.keys().forEach(c => {
  let componentName = c.match(reg)[1]
  let component = requireComponent(c).default || requireComponent(c)
  Vue.component(componentName, component)
})
