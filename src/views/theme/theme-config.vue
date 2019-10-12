<template>
  <ff-drawer
    title="样式选择"
    :isShow.sync="show"
  >
    <div class="config-item">
      <h3>布局</h3>
      <div class="config-item-content">
        <el-radio-group v-model="layout">
          <el-radio label="theme-LR">左右</el-radio>
          <el-radio label="theme-TB">上下</el-radio>
        </el-radio-group>
      </div>
    </div>
  </ff-drawer>
</template>

<script>
export default {
  name: 'theme-config',
  data () {
    return {}
  },
  computed: {
    show: {
      get () {
        return this.$store.state.theme.configShow
      },
      set (v) {
        this.$store.commit('setTheme', { prop: 'configShow', val: v })
      }
    },
    layout: {
      get () {
        return this.$store.state.theme.layout
      },
      set (v) {
        this.$store.commit('setTheme', { prop: 'layout', val: v })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .config-item {
    padding: 0 20px;
    h3 {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .config-item-content {
    }
  }
</style>
