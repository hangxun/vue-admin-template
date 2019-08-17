<template>
  <div class="index">
    <ff-menu :navs="navs"></ff-menu>
    <router-view />
  </div>
</template>

<script>
import dinyRoutes from '@/utils/addRoutes'
export default {
  name: 'Main',
  data () {
    return {
      navs: dinyRoutes
    }
  }
}
</script>

<style scoped lang="less">

</style>
