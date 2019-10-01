import formatRouter, { getFirstChild } from '@/utils/addRoutes'
// eslint-disable-next-line no-unused-vars
import router from '@/router'
import { getRoutes } from '@/api/requestRoutes'
import { isOnline } from '@/config'
import { routes as jsonRoutes } from '@/mock/routes'

export default {
  async addAsyncRoutes ({ commit }) {
    let rm
    if (isOnline) {
      let { data } = await getRoutes()
      rm = formatRouter(data)
    } else {
      rm = formatRouter(jsonRoutes)
    }
    let { routes, menus } = rm
    router.addRoutes(routes)
    commit('setRoutes', routes)
    commit('setMenus', menus)
    commit('addTab', getFirstChild(menus))
  }
}
