export default {
  install (Vue) {
    Vue.mixin({
      directives: {
        imgErr (el, binding, vnode) { // 图片加载失败显示404图片
          let errimg = binding.value || require('@/assets/404.gif')
          el.addEventListener('error', e => {
            e.target.src = errimg
          })
        }
      }
    })
  }
}
