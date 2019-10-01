import FormatRouter from '@/utils/addRoutes'
import router from '@/router'
import { getRoutes } from '@/api/requestRoutes'
import { isOnline } from '@/config'
import { routes as jsonRoutes } from '@/mock/routes'
import { getFirstChild, flatRoutes } from '@/utils/func'
import cloneDeep from 'lodash/cloneDeep'

export default {
  async addAsyncRoutes ({ commit }) {
    let routes
    if (isOnline) {
      let { data } = await getRoutes()
      routes = new FormatRouter(data).routes
    } else {
      routes = new FormatRouter(jsonRoutes).routes
    }
    let routesCopy = cloneDeep(routes)
    routesCopy[0].children = flatRoutes(routesCopy[0].children)
    router.addRoutes(routesCopy)
    console.log(routesCopy)
    commit('setRoutes', routesCopy)
    commit('setMenus', routes[0].children)
    commit('addTab', getFirstChild(routes))
  }
}
