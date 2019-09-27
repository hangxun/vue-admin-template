// 获取@/views下所有.vue文件的上下文
let routesCtx = require.context('@/views', true, /.vue$/)

// 格式化路由
class FormatRouter {
  constructor (serverRoutes) {
    this.routes = [{
      path: '/main',
      name: 'main',
      component: _ => import('@/views/main/main'),
      meta: { title: 'main' },
      children: []
    }]
    this._requireRoutes = []
    let loginoutIndex = serverRoutes.findIndex(v => v.name === 'loginout')
    if (loginoutIndex !== -1) {
      serverRoutes.push(...serverRoutes.splice(loginoutIndex, 1))
    }
    this._serverRoutes = serverRoutes
    this.init()
    this.computeRoutes()
    this.setRedirectRouter()
  }
  init () {
    routesCtx.keys().forEach(route => {
      let name = this.getDirName(route)
      let component = this.getComponentImport(route)
      this._requireRoutes.push({ name, component })
    })
  }
  computeRoutes () {
    let flatRoutes = this.assignRoutes()
    this.createRotuerTree(flatRoutes)
  }
  // 设置默认子路由
  setRedirectRouter () {
    let name = this.getFirstRouteName(this.routes)
    this.routes[0].redirect = { name }
  }
  // 合并路由
  assignRoutes () {
    let flatRoutes = []
    this._serverRoutes.forEach(route => {
      let serverRouteObj = {
        name: route.name,
        path: route.path || route.name,
        meta: {
          title: route.title,
          icon: route.icon,
          hidden: route.hidden
        }
      }
      let reqRoute = this._requireRoutes.find(r => r.name === route.name) || { path: route.name, component: _ => import('@/views/404/NotFound') }
      flatRoutes.push(Object.assign(reqRoute, serverRouteObj))
    })
    return flatRoutes
  }
  // 生成路由树
  createRotuerTree (flatRoutes) {
    let flatRoutesMap = this.mapRoutes(flatRoutes)
    this._serverRoutes.forEach(route => {
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
  // 获取第一个子路由
  getFirstRouteName (routes) {
    let firstName
    const getBosomItem = routes => {
      let firstItem = routes[0]
      if (firstItem.children && firstItem.children.length) {
        getBosomItem(firstItem.children)
      } else {
        firstName = firstItem.name
      }
    }
    getBosomItem(routes)
    return firstName
  }
  // 获取懒加载函数
  static getComponentImport (route) {
    let dirname = routesCtx.keys().find(r => r.includes(`${route.name}.vue`))
    let path
    if (dirname) {
      path = dirname.replace('.', 'views')
    } else {
      path = 'views/404/NotFound'
    }
    return _ => import(`@/${path}`)
  }
  // 匹配component
  static setComponent (routes) {
    routes.forEach(route => {
      route.component = this.getComponentImport(route)
      if (route.children && route.children.length) {
        this.setComponent(route.children)
      }
    })
    return routes
  }
}

export default FormatRouter
