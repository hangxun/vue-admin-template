<template>
  <el-menu
    :default-active="$route.name"
    class="navMenu"
    :mode="mode"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <subMenu v-for="route in navs" :key="route.path" :sub="route"></subMenu>
  </el-menu>
</template>

<script>
export default {
  name: 'navMenu',
  components: {
    'subMenu': _ => import('./subMeun')
  },
  props: {
    navs: {
      type: Array,
      default: _ => this.$router.$options.routes
    },
    mode: {
      type: String,
      default: 'vertical' // horizontal
    }
  },
  data () {
    return {}
  },
  methods: {
    handleSelect (name, match) {
      this.$router.push({ name })
      this.$emit('select', { name, match })
    }
  }
}
</script>

<style scoped lang="less">

</style>
