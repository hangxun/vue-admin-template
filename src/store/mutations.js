export default {
  setRoutes (state, routes) { // 设置路由
    state.routes = routes
  },
  setMenus (state, menus) { // 设置菜单
    state.menus = menus
  },
  setTheme (state, { prop, val }) { // 设置主题
    state.theme[prop] = val
  },
  addTab (state, newTab) { // 添加标签
    state.tabs.push(newTab)
  },
  removeTab (state, name) { // 删除标签
    if (state.tabs.length) {
      let idx = state.tabs.findIndex(tab => tab.name === name)
      state.tabs.splice(idx, 1)
    }
  }
}
