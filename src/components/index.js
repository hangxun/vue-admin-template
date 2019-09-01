import Vue from 'vue'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

const requireComponent = require.context('./', true, /index.vue$/)

const reg = /\.\/(\S+)\/index\.vue$/

requireComponent.keys().forEach(c => {
  let fileName = c.match(reg)[1]
  let componentName = upperFirst(camelCase(fileName))
  let component = requireComponent(c).default || requireComponent(c)
  Vue.component(componentName, component)
})
