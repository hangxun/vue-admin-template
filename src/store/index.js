import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: state => {
    return {
    }
  }
})

export default new Vuex.Store({
  state: {
  },
  getters: {

  },
  mutations: {
  },
  actions: {

  },
  plugins: [vuexLocal.plugin]
})
