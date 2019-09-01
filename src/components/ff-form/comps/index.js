const requireComponent = require.context('./', true, /.vue$/)
const camelCase = require('lodash/camelCase')
const upperFirst = require('lodash/upperFirst')

let components = {}
let reg = /\.\/(\S+)\.vue$/

requireComponent.keys().forEach(c => {
  let fileName = reg.exec(c)[1]
  let componentName = upperFirst(camelCase(fileName))
  components[componentName] = requireComponent(c).default || requireComponent(c)
})
console.log(components)
export default components
