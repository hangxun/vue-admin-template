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
export default {
  name: 'themeLR',
  data () {
    return {
      isCollapse: false
    }
  }
}
</script>

<style scoped lang="less">
  .theme-LR {
    width: 100%;
    display: flex;
    .scrollbar {
      height: 100%;
    }
    .nav {
      height: 100vh;
      background-color: #545c64;
      .menu {
        min-height: 100vh;
        border: none;
      }
    }
    .main-container {
      flex: 1 1 auto;
      height: calc(100vh - 61px);
      .collapse-icon {
        font-size: 28px !important;
        color: #ffffff;
        cursor: pointer;
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
