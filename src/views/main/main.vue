<template>
  <div class="Main">
    <div class="nav">
      <el-scrollbar class="scrollbar">
        <ff-menu :navs="navs" class="menu"></ff-menu>
      </el-scrollbar>
    </div>
    <div class="main-container">
      <el-scrollbar class="scrollbar">
        <router-view />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
    }
  },
  computed: {
    navs () {
      return this.$store.getters.menus
    }
  }
}
</script>

<style scoped lang="less">
  .Main {
    width: 100%;
    display: flex;
    .scrollbar {
      height: 100%;
    }
    .nav {
      width: 201px;
      height: 100vh;
      .scrollbar, .menu {
        min-height: 100vh;
      }
    }
    .main-container {
      flex: 1;
      height: 100vh;
    }
  }
</style>

<style>
  .Main .nav .el-scrollbar__wrap,
  .Main .main-container .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
