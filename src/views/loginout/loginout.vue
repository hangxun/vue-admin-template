<template>
  <div class="loginout"></div>
</template>

<script>
export default {
  name: 'loginout',
  data () {
    return {}
  },
  created () {
    sessionStorage.removeItem('ff_store')
    this.$router.replace('/')
    setTimeout(_ => {
      window.location.reload()
    }, 150)
  }
}
</script>

<style scoped>
</style>
