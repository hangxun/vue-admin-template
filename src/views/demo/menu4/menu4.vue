<template>
  <div class="menu4">
    menu4
    <div class="box" ref="box" v-click-outside="con"></div>
    <div class="ch" v-click-outside="con2"></div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'menu4',
  data () {
    return {}
  },
  methods: {
    con () {
      console.log(111)
    },
    con2 () {
      console.log(222)
    },
    contains (e) {
      console.log(this.$refs.box.contains(e.target))
    }
  }
}
</script>

<style scoped lang="less">
  .box {
    width: 200px;
    height: 200px;
    background-color: #009900;
  }
  .ch {
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
