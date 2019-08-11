import Vue from 'vue'
import Router from 'vue-router'
import dinyRoutes from '@/utils/addRoutes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: _ => import('@/views/Home/Home'), meta: { title: 'Home' } }
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
