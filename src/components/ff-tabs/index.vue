<template>
  <el-tabs
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
import { getHaveNameRoute } from '@/utils/func'
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
    },
    ...mapMutations(['addTab', 'removeTab'])
  }
}
</script>

<style scoped>
</style>
