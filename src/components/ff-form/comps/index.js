import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

const requireComponent = require.context('./', true, /.vue$/)

const reg = /\.\/(\S+)\.vue$/

let components = {}

requireComponent.keys().forEach(c => {
  let fileName = reg.exec(c)[1]
  let componentName = upperFirst(camelCase(fileName))
  components[componentName] = requireComponent(c).default || requireComponent(c)
})

export default components
