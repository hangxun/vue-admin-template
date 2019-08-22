// 获取@/views下所有.vue文件的上下文
let routesCtx = require.context('@/views', true, /.vue$/)

// 主路由
let Main = [
  {
    path: '/Main',
    name: 'Main',
    component: _ => import('@/views/Main/Main'),
    meta: { title: 'Main' }
  }
]

// 自定义静态路由
const staticRoutes = ['Home', 'Main', '404']

// 获取文件名
const getDirName = route => {
  let sp = route.split('/')
  let fileName = sp[sp.length - 1]
  return fileName.substring(0, fileName.length - 4)
}

// 获取懒加载函数
const getComponent = route => {
  let path = route.replace('.', 'views')
  return _ => import(`@/${path}`)
}

// 判断是否是静态路由
const isStatic = route => {
  return staticRoutes.some(s => route.includes(s))
}

// 获取实例
const getVm = route => {
  return routesCtx(route).default || routesCtx(route)
}

// 生成一级路由
let flatRoutes = routesCtx.keys().map(route => {
  let vm = getVm(route)
  if (isStatic(route)) return false
  if (vm.drother) return false
  let name = getDirName(route)
  let path = name
  let component = getComponent(route)
  let title = vm.title || name
  let hidden = vm.hidden || false
  let icon = vm.icon || ''
  let pname = vm.pname || 'Main'
  return { name, component, path, meta: { title, pname, hidden, icon } }
}).filter(r => r).concat(Main)

// 一级路由映射
let routesMap = {}

// 动态路由
let routes = []

// 添加子元素并映射
flatRoutes.forEach(r => {
  routesMap[r.name] = r
  r.children = []
})

// 生成动态路由
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
