<template>
  <el-submenu v-if="sub.children && sub.children.length" :index="sub.name">
    <template slot="title">
      <i v-if="sub.meta && sub.meta.icon" :class="sub.meta.icon"></i>
      {{sub.meta && sub.meta.title || sub.name}}
    </template>
    <subMeun v-for="ch in sub.children" :key="ch.path" :sub="ch"></subMeun>
  </el-submenu>
  <el-menu-item v-else :index="sub.name">
    <i v-if="sub.meta && sub.meta.icon" :class="sub.meta.icon"></i>
    {{sub.meta && sub.meta.title || sub.name}}
  </el-menu-item>
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
