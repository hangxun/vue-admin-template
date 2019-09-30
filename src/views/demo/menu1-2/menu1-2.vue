<template>
  <div class="menu1-2">
    <ff-table
      :titles="titles"
      :data="tableData"
    ></ff-table>
  </div>
</template>

<script>
export default {
  name: 'menu1-2',
  data () {
    return {
      titles: [
        { label: 'date', prop: 'date' },
        { label: 'name', prop: 'name' },
        { label: 'sort', prop: 'sort' },
        { label: 'address', prop: 'address' }
      ],
      tableData: [{
        date: '2016-05-02',
        name: 'b',
        address: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
        sort: '4'
      }, {
        date: '2016-05-04',
        name: 'c',
        address: '上海市普陀区金沙江路 1517 弄',
        sort: '2'
      }, {
        date: '2016-05-01',
        name: 'd',
        address: '上海市普陀区金沙江路 1519 弄',
        sort: '1'
      }, {
        date: '2016-05-03',
        name: 'a',
        address: '上海市普陀区金沙江路 1516 弄',
        sort: '3'
      }]
    }
  },
  methods: {
    formatter (row, column) {
      return row.address
    }
  }
}
</script>

<style scoped>
</style>
