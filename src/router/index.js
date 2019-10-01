import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { setComponent } from '@/utils/addRoutes'

const { routes } = store.state

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: _ => import('@/views/home/home'), meta: { title: 'home' } },
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
  let asyncRoutes = setComponent(routes)
  router.addRoutes(asyncRoutes)
}

router.beforeEach(async (to, from, next) => {
  let title = to.meta.title
  if (title) document.title = title
  next()
})

export default router
