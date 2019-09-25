import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import FormatRouter from '@/utils/addRoutes'

const { routes } = store.state

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: _ => import('@/views/Home/Home'), meta: { title: 'Home' } },
    { path: '/routerSetting', name: 'routerSetting', component: _ => import('@/views/routerSetting/routerSetting'), meta: { title: '路由配置' } },
    { path: '/404', component: _ => import('@/views/404/NotFound'), meta: { title: '404' } },
    { path: '*', redirect: '/404' }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

if (routes.length) {
  let asyncRoutes = FormatRouter.setComponent(routes)
  router.addRoutes(asyncRoutes)
}

router.beforeEach(async (to, from, next) => {
  let title = to.meta.title
  if (title) document.title = title
  next()
})

export default router
