import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import FormatRouter from '@/utils/addRoutes'
import { getRoutes } from '@/api/requestRoutes'
import router from '@/router'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: 'ff_store',
  storage: window.sessionStorage,
  reducer: state => {
    return {
      routes: state.routes,
      menus: state.menus
    }
  }
})

export default new Vuex.Store({
  state: {
    routes: [],
    menus: []
  },
  mutations: {
    setRoutes (state, routes) {
      state.routes = routes
    },
    setMenus (state, menus) {
      state.menus = menus
    }
  },
  actions: {
    async addAsyncRoutes ({ commit }) {
      let { data } = await getRoutes()
      let routes = new FormatRouter(data).routes
      console.log(routes)
      router.addRoutes(routes)
      commit('setRoutes', data)
      commit('setMenus', routes[0].children)
    }
  },
  plugins: [vuexLocal.plugin]
})
