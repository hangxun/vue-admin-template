export default {
  menus (state) {
    return state.routes.length ? state.routes[0].children : []
  }
}
