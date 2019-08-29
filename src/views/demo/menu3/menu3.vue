<template>
  <div class="menu3">
    menu3
    <ff-table
      :data="data"
      :titles="titles"
      @row-click="rowClick"
    >
      <template #aaa="{ row }">
          {{row.a}}
      </template>
      <template #bbb="{ row }">
        {{row.b}}
      </template>
    </ff-table>
  </div>
</template>

<script>
export default {
  name: 'menu3',
  title: '菜单3',
  data () {
    return {
      current: 0,
      data: [
        { a: 111, b: 222 },
        { a: 111, b: 222 },
        { a: 111, b: 222 }
      ],
      titles: [
        { label: 'aaa', slot: 'aaa' },
        { label: 'bbb', slot: 'bbb' },
        {
          label: 'ccc',
          render: this.render,
          prop: 'c'
        },
        { label: 'ddd', prop: 'bbb' }
      ]
    }
  },
  methods: {
    render (h, row, column, index) {
      return <div v-on:click={e => this.changeIdx(e, index)} style={{ cursor: 'pointer' }}>
        {this.current === index ? <el-input v-model={row[column.prop]} placeholder={'按下回车键确认'} v-on:keypress_enter_native={this.resetCurrent}/> : <span>{row[column.prop] || '--'}</span>}
      </div>
    },
    changeIdx (e, index) {
      this.current = index
      this.$nextTick(_ => {
        e.currentTarget.querySelector('input').focus()
      })
    },
    resetCurrent () {
      this.current = -1
    },
    rowClick (row, column, event) {
      console.log(row, column, event)
    }
  }
}
</script>

<style scoped>
</style>
