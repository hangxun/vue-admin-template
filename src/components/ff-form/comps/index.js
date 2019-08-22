const compsCtx = require.context('./', true, /.vue$/)

let components = {}

compsCtx.keys().forEach(c => {
  let comp = compsCtx(c).default || compsCtx(c)
  components[comp.name] = comp
})

export default components
