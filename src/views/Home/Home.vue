<template>
  <div class="index">
    <login></login>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    'login': _ => import('../login/login')
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
  .index {
    width: 100%;
    height: 100vh;
    background: url("../../assets/home-bg.jpg") no-repeat center / cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
