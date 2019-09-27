import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: 'ff_store',
  storage: window.sessionStorage,
  reducer: state => {
    return {
      routes: state.routes
    }
  }
})

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [vuexLocal.plugin]
})
