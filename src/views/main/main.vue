<template>
  <div class="Main">
    <component :is="layout" />
    <theme-config :isShow.sync="isShow" />
  </div>
</template>

<script>
export default {
  name: 'Main',
  components: {
    'theme-config': _ => import('@/views/theme/theme-config'),
    'theme-LR': _ => import('@/views/theme/theme-LR'),
    'theme-TB': _ => import('@/views/theme/theme-TB')
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    layout () {
      return this.$store.state.theme.layout
    }
  }
}
</script>

<style scoped lang="less">

</style>
