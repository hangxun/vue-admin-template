<template>
  <el-submenu v-if="sub.children && sub.children.length" :index="sub.name" :popper-append-to-body="false">
    <template slot="title">
      <i v-if="sub.meta && sub.meta.icon" :class="sub.meta.icon"></i>
      {{sub.meta && sub.meta.title || sub.name}}
    </template>
    <subMenu v-for="ch in sub.children" :key="ch.path" :sub="ch"></subMenu>
  </el-submenu>
  <el-menu-item v-else :index="sub.name">
    <i v-if="sub.meta && sub.meta.icon" :class="sub.meta.icon"></i>
    {{sub.meta && sub.meta.title || sub.name}}
  </el-menu-item>
</template>

<script>
export default {
  name: 'subMenu',
  props: {
    sub: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">

</style>
