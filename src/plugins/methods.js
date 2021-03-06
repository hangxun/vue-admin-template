import cloneDeep from 'lodash/cloneDeep'

export default {
  install (Vue) {
    Vue.mixin({
      methods: {
        async $_request (fn, params, msg = false) { // 请求数据
          let data
          if (typeof params === 'boolean') {
            msg = params
            data = await fn()
          } else {
            data = await fn(params)
          }
          if (msg) {
            let message = msg === true ? data.message : msg
            this.$message({
              message,
              type: 'success'
            })
          }
          return data
        },
        $_delConfirm (thenFn, catchFn) { // 确认删除
          this.$confirm('是否确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            thenFn && thenFn()
          }).catch(() => {
            catchFn && catchFn()
          })
        },
        $_copy: cloneDeep, // 深拷贝
        $_loginOut () { // 退出登录
          sessionStorage.removeItem('ff_store')
          this.$router.replace('/')
          setTimeout(_ => {
            window.location.reload()
          }, 150)
        }
      }
    })
  }
}
