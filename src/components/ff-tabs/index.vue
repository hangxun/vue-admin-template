<template>
  <el-tabs
    class="ff-tabs"
    :value="$route.name"
    type="card"
    closable
    @tab-click="handleClick"
    @tab-remove="handleRemove">
    <el-tab-pane
      v-for="item in tabs"
      :key="item.name"
      :label="item.meta.title"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getHaveNameRoute } from '@/utils/addRoutes'
export default {
  name: 'FfTabs',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['tabs', 'routes'])
  },
  watch: {
    '$route' (currentRoute) {
      if (this.tabs.findIndex(v => v.name === currentRoute.name) === -1) {
        let route = getHaveNameRoute(this.routes, currentRoute.name)
        this.addTab(route)
      }
    }
  },
  methods: {
    handleClick (tab) {
      if (tab.name !== this.$route.name) {
        this.$router.push({ name: tab.name })
      }
    },
    handleRemove (name) {
      if (this.tabs.length > 1) {
        let index = this.tabs.findIndex(v => v.name === name)
        this.removeTab(name)
        if (this.$route.name === name) {
          let toIndex = index === 0 ? index : index - 1
          this.$router.push({ name: this.tabs[toIndex].name })
        }
      }
    },
    ...mapMutations(['addTab', 'removeTab'])
  }
}
</script>

  <style>
  .ff-tabs .el-tabs__header {
    margin: 0;
  }
</style>
