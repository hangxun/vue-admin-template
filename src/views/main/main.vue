<template>
  <div class="Main">
    <component :is="layout" />
  </div>
</template>

<script>
export default {
  name: 'Main',
  components: {
    'theme-LR': _ => import('@/views/theme/theme-LR'),
    'theme-TB': _ => import('@/views/theme/theme-TB')
  },
  data () {
    return {
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
