<template>
  <div class="menu1-2">
    menu1-2
    <img src="http://pics.sc.chinaz.com/files/pic/pic9/201909/bpic1370.jpg" alt="" v-img-err="img">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'menu1-2',
  data () {
    return {
      img: require('@/assets/404.jpg')
    }
  }
}
</script>

<style scoped>
</style>
