import _cloneDeep from 'lodash/cloneDeep'

export default {
  install (Vue) {
    Vue.mixin({
      methods: {
        async _request (fn, params, msg = false) {
          let data = await fn(params)
          if (msg) {
            let message = msg === true ? data.message : msg
            this.$message({
              message,
              type: 'success'
            })
          }
          return data
        },
        _delConfirm (thenFn, catchFn) {
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
        _cloneDeep
      }
    })
  }
}
