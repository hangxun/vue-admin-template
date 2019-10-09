<template>
  <div class="theme-TB">
    <div class="theme-TB-header">
      <div class="nav">
        <el-scrollbar class="scrollbar">
          <ff-menu class="menu" :navs="$store.state.menus" mode="horizontal"></ff-menu>
        </el-scrollbar>
      </div>
      <ff-header class="config"></ff-header>
    </div>
    <div class="tab-bar" v-if="navigate">
      <ff-matched v-if="navigate === 'matched'" />
      <ff-tabs v-if="navigate === 'tabs'" />
    </div>
    <div class="main-container" v-if="navigate === 'tabs'">
      <el-scrollbar class="scrollbar">
        <keep-alive :include="tabsName">
          <router-view v-if="$route.meta.keepAlive"  />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </el-scrollbar>
    </div>
    <div class="main-container" v-else>
      <el-scrollbar class="scrollbar">
        <router-view />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { navigate } from '@/config'
export default {
  name: 'theme-TB',
  data () {
    return {
      navigate
    }
  },
  computed: {
    tabsName () {
      return this.$store.state.tabs.map(v => v.name)
    }
  }
}
</script>

<style scoped lang="less">
  .theme-TB {
    .theme-TB-header {
      width: 100%;
      display: flex;
      .nav {
        width: calc(100% - 130px);
        .scrollbar {
          width: 100%;
        }
        .menu {
          display: flex;
        }
      }
      .config {
        width: 130px;
      }
    }
    .tab-bar {
      width: 100vw;
    }
    .main-container {
      width: 100%;
      height: calc(100vh - 102px);
      box-sizing: border-box;
      .scrollbar {
        height: 100%;
      }
    }
  }
</style>

<style>
  .theme-TB .nav .el-scrollbar__wrap {
    overflow-y: hidden;
  }
  .theme-TB .main-container .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
