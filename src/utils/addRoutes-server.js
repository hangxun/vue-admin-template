// 获取@/views下所有.vue文件的上下文
let routesCtx = require.context('@/views', true, /.vue$/)

// 主路由
let Main = _ => {
  return {
    path: '/main',
    name: 'Main',
    component: _ => import('@/views/Main/Main'),
    meta: { title: 'Main' },
    children: []
  }
}

// eslint-disable-next-line no-unused-vars
let NotFound = { path: '/404', component: _ => import('@/views/404/NotFound') }

class FormatRouter {
  constructor (serverRoutes) {
    this.routes = [Main(), { path: '*', redirect: '/404' }]
    this.requireRoutes = []
    this.serverRoutes = serverRoutes
    this.init()
    this.computeRoutes()
  }
  init () {
    routesCtx.keys().forEach(route => {
      let name = this.getDirName(route)
      let path = name
      let component = this.getComponentImport(route)
      this.requireRoutes.push({ name, path, component })
    })
  }
  computeRoutes () {
    let flatRoutes = []
    this.serverRoutes.forEach(route => {
      let serverRouteObj = {
        name: route.name,
        meta: {
          title: route.title,
          hidden: route.hidden
        }
      }
      let reqRoute = this.requireRoutes.find(r => r.name === route.name) || NotFound
      flatRoutes.push(Object.assign(serverRouteObj, reqRoute))
    })
    let flatRoutesMap = this.mapRoutes(flatRoutes)
    this.serverRoutes.forEach(route => {
      let parentRoute = flatRoutesMap[route.pname]
      let currentRoute = flatRoutesMap[route.name]
      if (parentRoute) {
        if (!parentRoute.children) {
          parentRoute.children = [currentRoute]
        } else {
          parentRoute.children.push(currentRoute)
        }
      } else {
        this.routes[0].children.push(currentRoute)
      }
    })
  }
  // 获取文件名
  getDirName (route) {
    let sp = route.split('/')
    let fileName = sp[sp.length - 1]
    return fileName.substring(0, fileName.length - 4)
  }
  // 获取懒加载函数
  getComponentImport (route) {
    let path = route.replace('.', 'views')
    return _ => import(`@/${path}`)
  }
  // 映射路由
  mapRoutes (routes) {
    return routes.reduce((prev, curr) => {
      prev[curr.name] = curr
      return prev
    }, {})
  }
}

export default FormatRouter
