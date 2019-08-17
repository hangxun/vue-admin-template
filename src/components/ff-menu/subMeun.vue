<template>
  <el-submenu v-if="sub.children && sub.children.length" :index="sub.name">
    <template slot="title">{{sub.meta && sub.meta.title || sub.name}}</template>
    <template v-for="ch in sub.children">
      <subMeun :key="ch.path" :sub="ch"></subMeun>
    </template>
  </el-submenu>
  <el-menu-item v-else :index="sub.name">{{sub.meta && sub.meta.title || sub.name}}</el-menu-item>
</template>

<script>
export default {
  name: 'subMeun',
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
