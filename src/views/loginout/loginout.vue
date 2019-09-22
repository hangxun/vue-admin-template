<template>
  <div class="loginout"></div>
</template>

<script>
export default {
  name: 'loginout',
  data () {
    return {}
  },
  beforeCreate () {
    this.$router.push('/')
    sessionStorage.removeItem('ff_store')
    setTimeout(_ => {
      window.location.reload()
    }, 200)
  }
}
</script>

<style scoped>
</style>
