<template>
  <div class="index">
    <navMenu :navs="navs"></navMenu>
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
