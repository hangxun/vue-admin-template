<template>
  <div class="Main">
    <div class="nav">
      <ff-menu :navs="navs" class="menu"></ff-menu>
    </div>
    <div class="main-container"><router-view /></div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
    }
  },
  computed: {
    navs () {
      return this.$store.getters.menus
    }
  }
}
</script>

<style scoped lang="less">
  .Main {
    width: 100%;
    display: flex;
    .nav {
      width: 201px;
      height: 100vh;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display:none
      }
      .menu {
        min-height: 100%;
      }
    }
    .main-container {
      flex: 1;
      height: 100vh;
      overflow-y: auto;
    }
  }
</style>
