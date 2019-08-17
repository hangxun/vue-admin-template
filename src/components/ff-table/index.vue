<template>
  <el-table
    class="ff-table"
    ref="table"
    :data="data"
    :border="border"
    :highlight-current-row="isRadio"
    @row-click="rowClick"
    @selection-change="selectionChange"
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      v-if="isSelection"
      type="selection"
      width="55">
    </el-table-column>
    <template v-for="(item, idx) in titles">
      <el-table-column
        v-if="item.slot"
        :key="idx"
        :align="item.align || 'center'"
        :label="item.label"
        :min-width="item.width || 120">
        <template slot-scope="scope">
          <slot :name="item.slot" :row="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="idx"
        :align="item.align || 'center'"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width || 120">
      </el-table-column>
    </template>
    <el-table-column
      v-if="isAdd || isEdit || isLook || isDel"
      align="center"
      label="操作"
      min-width="120">
      <template slot-scope="scope">
        <el-button type="text" v-if="isAdd" icon="el-icon-plus" @click.stop="handleAdd(scope.row)"></el-button>
        <el-button class="centerBtn" type="text" v-if="isEdit" icon="el-icon-edit" @click.stop="handleEdit(scope.row)"></el-button>
        <el-button type="text" v-if="isLook" icon="el-icon-view" @click.stop="handleLook(scope.row)"></el-button>
        <el-button type="text" v-if="isDel" icon="el-icon-delete" @click.stop="handleDel(scope.row)"></el-button>
        <slot name="handler" :row="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
/**
 * 必填
 * @param titles: 表头数据, [{ label: '', prop: '', width: '', slot: '', align: '' }]
 * @param data: 表格显示的数据
 *
 * 选填
 * @param handler: 操作栏显示的按钮类型，['add', 'edit', 'look', 'del']
 * @param isSelection: 是否多选
 * @param isRadio: 是否单选
 * @param border: 是否带边框
 * @function selectionChange(selection) {}: 当选择项发生变化时会触发该事件
 * @function currentChange(row) {}: 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 isRadio 属性
 * @function rowClick(row, column, event) {}: 当某一行被点击时会触发该事件
 * @function add(row) {}: 点击添加按钮是触发的事件
 * @function edit(row) {}: 点击编辑按钮是触发的事件
 * @function look(row) {}: 点击查看按钮是触发的事件
 * @function del(row) {}: 点击删除按钮是触发的事件
 * */

/**
 * 表头数据
 * titles
 * @param label: 显示的标题
 * @param prop: 对应列内容的字段名，也可以使用 property 属性
 * @param width: 对应列的最小宽度，默认120px, 与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
 * @param slot: 自定义列的插槽名，具体用法可参考↓, row: 行数据
 * @param align： 对齐方式  left/center/right  默认center
 *
 * slot
 * <template slot="插槽名" slot-scope="{ row }"></template>
 * */

/**
 * 操作栏按钮类型
 * handler
 * @param add: 添加按钮
 * @param edit: 编辑按钮
 * @param look: 查看按钮
 * @param del: 删除按钮
 *
 * slot
 * <template slot="handler" slot-scope="{ row }"></template>
 * */
export default {
  name: 'ffTable',
  props: {
    data: {
      type: Array,
      default: _ => []
    },
    titles: {
      type: Array,
      default: _ => []
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    handler: {
      type: Array,
      default: _ => []
    }
  },
  computed: {
    isAdd () {
      return this.handler.includes('add')
    },
    isEdit () {
      return this.handler.includes('edit')
    },
    isLook () {
      return this.handler.includes('look')
    },
    isDel () {
      return this.handler.includes('del')
    }
  },
  methods: {
    rowClick (row, column, event) {
      this.$emit('row-click', row, column, event)
      if (this.isSelection) {
        this.toggleRowSelection(row)
      }
    },
    selectionChange (selection) {
      this.$emit('selection-change', selection)
    },
    handleCurrentChange (row) {
      this.$emit('currentChange', row)
    },
    toggleRowSelection (row) {
      this.$refs.table.toggleRowSelection(row)
    },
    handleAdd (row) {
      this.$emit('add', row)
    },
    handleEdit (row) {
      this.$emit('edit', row)
    },
    handleLook (row) {
      this.$emit('look', row)
    },
    handleDel (row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('del', row)
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
  .centerBtn {
    margin-left: 20px;
    margin-right: 10px;
  }
</style>
