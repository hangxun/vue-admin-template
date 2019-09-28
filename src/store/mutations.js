export default {
  setRoutes (state, routes) {
    state.routes = routes
  },
  setTheme (state, { prop, val }) {
    state.theme[prop] = val
  }
}
