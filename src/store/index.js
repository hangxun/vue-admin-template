import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const sessionStore = new VuexPersistence({
  key: 'ff_store',
  storage: window.sessionStorage,
  reducer: state => {
    return {
      routes: state.routes
    }
  }
})

const localStore = new VuexPersistence({
  key: 'ff_store',
  storage: window.localStorage,
  reducer: state => {
    return {
      theme: state.theme
    }
  }
})

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [sessionStore.plugin, localStore.plugin]
})
