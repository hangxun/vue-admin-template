<template>
  <div class="menu3">
    menu3
    <ff-table
      :data="data"
      :titles="titles"
      :load="load"
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
  data () {
    return {
      current: 0,
      data: [
        { id: 1, a: 111, b: 222 },
        { id: 2, a: 111, b: 222 },
        { id: 3, a: 111, b: 222 }
      ],
      titles: [
        { label: 'aaa', prop: 'aaa', slot: 'aaa' },
        { label: 'bbb', prop: 'bbb', slot: 'bbb' },
        {
          label: 'ccc',
          render: this.render,
          prop: 'c'
        },
        { label: 'ddd', prop: 'ddd' }
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
    },
    load (tree, treeNode, resolve) {
      let children = []
      for (let i = 0; i < 4; i++) {
        children.push({
          id: `${tree.id}-${i}`,
          a: `aaa${i}`,
          b: `bbb${i}`
        })
      }
      setTimeout(_ => {
        resolve(children)
      }, 1000)
    }
  }
}
</script>

<style scoped>
</style>
