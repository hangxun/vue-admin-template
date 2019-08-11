let routesCtx = require.context('@/views', true, /.vue$/)

const getName = route => {
  let regExp = /\/(\w+)\.vue$/
  let name = regExp.exec(route)[1]
  return name
}

const getComp = route => {
  let compment = routesCtx(route)
  return compment.default || compment
}

const isBaseRoutes = route => {
  let sp = route.split('/')
  let dirName = sp[sp.length - 2]
  let baseRoutes = ['Home', 'Main']
  if (baseRoutes.includes(dirName)) return true
  else return false
}

let routes = routesCtx.keys().map(route => {
  if (isBaseRoutes(route)) return null
  let name = getName(route)
  let path = `/main/${name}`
  let component = getComp(route)
  return {
    name,
    path,
    component,
    meta: { title: name }
  }
}).filter(r => r)

let Main = [
  {
    path: '/main',
    name: 'main',
    component: _ => import('@/views/Main/Main'),
    meta: { title: 'main' },
    children: routes
  }
]

export default Main
