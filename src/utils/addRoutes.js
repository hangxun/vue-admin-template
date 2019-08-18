// 创建views文件夹模块的上下文
let routesCtx = require.context('@/views', true, /.vue$/)

// 获取实例
const getComp = route => {
  let compment = routesCtx(route)
  return compment.default || compment
}

// 获取懒加载函数
const compImport = route => {
  let path = routesCtx.resolve(route).slice(6)
  return _ => import(`@/${path}`)
}

// 判断是否是静态路由
const isBaseRoutes = route => {
  let name = getComp(route).name
  let baseRoutes = ['Home', 'Main', 'NotFound']
  return baseRoutes.includes(name)
}

// 主路由
let Main = [
  {
    path: '/Main',
    name: 'Main',
    component: _ => import('@/views/Main/Main'),
    meta: { title: 'Main' }
  }
]

// 生成单层路由
let flatRoutes = routesCtx.keys().map(route => {
  if (isBaseRoutes(route)) return null
  let comp = getComp(route)
  if (comp.drother) return null
  let name = comp.name
  let component = compImport(route)
  let title = comp.title || comp.name
  let hidden = comp.hidden === true
  let pname = comp.pname || 'Main'
  return {
    path: name,
    name,
    component,
    meta: { title, hidden, pname }
  }
}).filter(r => r).concat(Main)

// 单层路由映射
let routesMap = {}

// 正式路由
let routes = []

// 遍历单层路由添加子路由并映射
flatRoutes.forEach(route => {
  route.children = []
  routesMap[route.name] = route
})

// 按依赖关系构建路由
flatRoutes.forEach(route => {
  if (route.name === 'Main') {
    routes.push(route)
  } else {
    let parent = routesMap[route.meta.pname]
    if (parent) {
      routesMap[parent.name].children.push(route)
    }
  }
})

export default routes
