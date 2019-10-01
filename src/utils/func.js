import cloneDeep from 'lodash/cloneDeep'

export const getFirstChild = (routes, childrenProp = 'children') => { // 获取第一个没有子节点的路由
  let firstChild
  const getBosomItem = routes => {
    let firstItem = routes[0]
    if (firstItem.children && firstItem.children.length) {
      getBosomItem(firstItem.children)
    } else {
      firstChild = firstItem
    }
  }
  getBosomItem(routes)
  return firstChild
}

export const getHaveNameRoute = (routes, name) => { // 获取某个name的路由
  let resultRoute
  const eachRoutes = routes => {
    routes.forEach(route => {
      if (route.name === name) {
        resultRoute = route
        return
      }
      if (route.children && route.children.length) {
        eachRoutes(route.children)
      }
    })
  }
  eachRoutes(routes)
  return resultRoute
}

export const flatRoutes = routes => {
  let result = []
  let cloneRoutes = cloneDeep(routes)
  const eachRoutes = routes => {
    routes.forEach(route => {
      result.push(route)
      if (route.children && route.children.length) {
        eachRoutes(route.children)
        delete route.children
      }
    })
  }
  eachRoutes(cloneRoutes)
  return result
}
