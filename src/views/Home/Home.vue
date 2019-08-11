<template>
  <div class="index">
    <navMenu :navs="navs"></navMenu>
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
