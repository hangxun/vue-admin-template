<template>
  <div class="index">
    <ff-menu :navs="navs"></ff-menu>
  </div>
</template>

<script>
import dinyRoutes from '@/utils/addRoutes'
export default {
  name: 'Home',
  data () {
    return {
      navs: dinyRoutes
    }
  }
}
</script>

<style scoped lang="less">

</style>
