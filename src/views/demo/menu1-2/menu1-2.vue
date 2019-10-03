<template>
  <div class="menu1-2">
    <ff-table
      style="width: 80%; margin: 0 auto;"
      :titles="titles"
      :data="tableData"
      rowKey="id"
      dropColumn
      dropRow
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
        { label: 'address', prop: 'address' },
        { label: 'status', prop: 'status', formatter: row => row.status === '1' ? '是' : '否' }
      ],
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: 'b',
        address: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
        sort: '4',
        status: '0'
      }, {
        id: 2,
        date: '2016-05-04',
        name: 'c',
        address: '上海市普陀区金沙江路 1517 弄',
        sort: '2',
        status: '1'
      }, {
        id: 3,
        date: '2016-05-01',
        name: 'd',
        address: '上海市普陀区金沙江路 1519 弄',
        sort: '1',
        status: '1'
      }, {
        id: 4,
        date: '2016-05-03',
        name: 'a',
        address: '上海市普陀区金沙江路 1516 弄',
        sort: '3',
        status: '0'
      }]
    }
  },
  methods: {
    formatter (row, column) {
      return row.address
    }
  },
  created () {
    console.log('menu1-2')
  }
}
</script>

<style scoped>
</style>
