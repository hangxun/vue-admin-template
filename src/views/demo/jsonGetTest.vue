<template>
  <div class="jsonServer">
    <ff-table
      :titles="titles"
      :data="tableData"
    ></ff-table>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'
export default {
  name: 'jsonGetTest',
  title: 'json-serve-get',
  icon: 'el-icon-sold-out',
  data () {
    return {
      titles: [
        { label: 'name', prop: 'name' },
        { label: 'age', prop: 'age' },
        { label: 'avatar', render: this.render }
      ],
      tableData: [],
      page: 1
    }
  },
  created () {
    this.req()
  },
  methods: {
    render (h, row, column, index) {
      return <i class={row.avatar}></i>
    },
    async req () {
      let list = await getUserList()
      this.tableData = list
    }
  }
}
</script>

<style scoped>
</style>
