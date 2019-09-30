<template>
  <div class="theme-LR">
    <div class="nav">
      <el-scrollbar class="scrollbar">
        <ff-menu class="menu" :navs="$store.getters.menus" :isCollapse="isCollapse"></ff-menu>
      </el-scrollbar>
    </div>
    <div class="main-container">
      <ff-header>
        <template #left>
<!--          <span></span>-->
          <i class="collapse-icon" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="isCollapse = !isCollapse"></i>
        </template>
      </ff-header>
      <el-scrollbar class="scrollbar">
        <ff-matched />
        <div class="main-content"><router-view /></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  name: 'themeLR',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    changeCollapse () {
      let w = window.innerWidth
      if (w > 1200 && this.isCollapse) this.isCollapse = false
      if (w <= 1200 && !this.isCollapse) this.isCollapse = true
    }
  },
  mounted () {
    this.changeCollapse()
    this.changeCollapse = debounce(this.changeCollapse, 300)
    window.addEventListener('resize', this.changeCollapse)
  },
  destroyed () {
    window.removeEventListener('resize', this.changeCollapse)
  }
}
</script>

<style scoped lang="less">
  .theme-LR {
    width: 100%;
    display: flex;
    .nav {
      height: 100vh;
      background-color: #545c64;
      .menu {
        min-height: 100vh;
        border: none;
      }
      .scrollbar {
        height: 100%;
      }
    }
    .main-container {
      flex: 1 1 auto;
      height: 100vh;
      display: flex;
      flex-direction: column;
      .collapse-icon {
        font-size: 28px !important;
        color: #ffffff;
        cursor: pointer;
      }
      .scrollbar {
        flex: 1 1 auto;
      }
    }
  }
</style>

<style>
  .theme-LR .nav .el-scrollbar__wrap,
  .theme-LR .main-container .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .theme-LR .nav .el-scrollbar__view {
    max-width: 200px;
  }
</style>
