import Vue from 'vue'
import Router from 'vue-router'
import dinyRoutes from '@/utils/addRoutes'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: _ => import('@/views/Home/Home'), meta: { title: 'Home' } },
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

router.addRoutes(dinyRoutes)

router.beforeEach((to, from, next) => {
  let title = to.meta.title
  if (title) document.title = title
  next()
})

export default router
