<template>
  <el-breadcrumb class="ff-matched" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in matched" :key="item.name" :to="{ name: item.name }">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'FfMatched',
  data () {
    return {}
  },
  computed: {
    matched () {
      return this.$route.matched.slice(1)
    }
  }
}
</script>

<style scoped lang="less">
  .ff-matched {
    padding: 10px;
  }
</style>
