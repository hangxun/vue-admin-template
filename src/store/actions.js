import FormatRouter from '@/utils/addRoutes'
import router from '@/router'
import { getRoutes } from '@/api/requestRoutes'
import { isOnline } from '@/config'
import { routes as jsonRoutes } from '@/mock/routes'

export default {
  async addAsyncRoutes ({ commit }) {
    let routes
    if (isOnline) {
      let { data } = await getRoutes()
      routes = new FormatRouter(data).routes
    } else {
      routes = new FormatRouter(jsonRoutes).routes
    }
    router.addRoutes(routes)
    commit('setRoutes', routes)
  }
}
