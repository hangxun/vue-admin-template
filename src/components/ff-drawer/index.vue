<template>
  <el-drawer
    :title="title"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose">
    <div class="drawer-container">
      <el-scrollbar class="drawer-scrollbar">
        <slot></slot>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<script>
/**
 * @param {boolean} isShow 是否显示， 支持sync
 * @param {string} title 标题
 * @param {string} direction 打开方向 rtl / ltr / ttb / btt
 * @param {function} handleClose 关闭前的回调，会暂停 Drawer 的关闭。 function(done)，done 用于关闭 Drawer
 * */
export default {
  name: 'FfDrawer',
  props: {
    title: {
      type: String,
      default: ''
    },
    direction: {
      type: String,
      default: 'rtl'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    handleClose: Function
  },
  data () {
    return {
      drawer: false
    }
  },
  watch: {
    isShow (v) {
      if (this.drawer !== v) this.drawer = v
    },
    drawer (v) {
      if (this.isShow !== v) this.$emit('update:isShow', v)
    }
  },
  created () {
    this.drawer = this.isShow
  }
}
</script>

<style scoped lang="less">
  .drawer-container {
    height: calc(100vh - 46px);
    .drawer-scrollbar {
      height: 100%;
    }
  }
</style>
