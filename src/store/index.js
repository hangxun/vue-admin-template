import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import FormatRouter from '@/utils/addRoutes'
import { getRoutes } from '@/api/requestRoutes'
import router from '@/router'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: state => {
    return {
      routes: state.routes
    }
  }
})

export default new Vuex.Store({
  state: {
    routes: []
  },
  getters: {
    menus (state) {
      if (state.routes.length) {
        return new FormatRouter(state.routes).routes[0].children
      } else {
        return []
      }
    }
  },
  mutations: {
    setRoutes (state, routes) {
      state.routes = routes
    }
  },
  actions: {
    async addAsyncRoutes ({ commit }) {
      let { data } = await getRoutes()
      let routes = new FormatRouter(data).routes
      router.addRoutes(routes)
      commit('setRoutes', data)
    }
  },
  plugins: [vuexLocal.plugin]
})
