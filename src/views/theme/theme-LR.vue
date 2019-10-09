<template>
  <div class="theme-LR">
    <div class="nav">
      <el-scrollbar class="scrollbar">
        <ff-menu class="menu" :navs="$store.state.menus" :isCollapse="isCollapse"></ff-menu>
      </el-scrollbar>
    </div>
    <div class="main-container" :style="{ width: isCollapse ? 'calc(100% - 64px)' : 'calc(100% - 200px)' }">
      <ff-header>
        <template #left>
<!--          <span></span>-->
          <i class="collapse-icon" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="isCollapse = !isCollapse"></i>
        </template>
      </ff-header>
      <div class="tab-bar" :class="isCollapse ? 'big' : 'small'" v-if="navigate">
        <ff-matched v-if="navigate === 'matched'" />
        <ff-tabs v-if="navigate === 'tabs'" />
      </div>
      <el-scrollbar class="scrollbar">
        <div class="main-content" v-if="navigate === 'tabs'">
          <keep-alive :include="tabsName">
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" />
        </div>
        <router-view v-else />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { navigate } from '@/config'
export default {
  name: 'themeLR',
  data () {
    return {
      isCollapse: false,
      navigate
    }
  },
  computed: {
    tabsName () {
      return this.$store.state.tabs.map(v => v.name)
    }
  },
  methods: {
    changeCollapse () {
      let w = window.innerWidth
      if (w > 1180 && this.isCollapse) this.isCollapse = false
      if (w <= 1180 && !this.isCollapse) this.isCollapse = true
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
      .tab-bar {
        &.small {
          width: calc(100vw - 205px);
        }
        &.big {
          width: calc(100vw - 69px);
        }
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
