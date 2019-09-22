<template>
  <el-table
    style="width: 100%"
    class="ff-table"
    ref="table"
    :data="data"
    :border="isBorder"
    :highlight-current-row="isRadio"
    :row-key="rowKey"
    :tree-props="treeProps"
    :lazy="isLazy"
    :load="load"
    @row-click="rowClick"
    @selection-change="selectionChange"
    @current-change="handleCurrentChange">
    <el-table-column
      v-if="isSelection"
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      v-if="isShowIndex"
      type="index"
      align="center"
      width="50">
    </el-table-column>
    <template v-for="(item, idx) in titles">
      <el-table-column
        v-if="item.render"
        :key="idx"
        :align="item.align || 'center'"
        :label="item.label"
        :min-width="item.width || 50">
        <template v-slot="scope">
          <render v-if="item.render" :key="idx" :render="item.render" :row="scope.row" :column="item" :index="getIndex(scope.row)"></render>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="item.slot"
        :key="idx"
        :align="item.align || 'center'"
        :label="item.label"
        :min-width="item.width || 50">
        <template v-slot="scope">
          <slot :name="item.slot" :row="scope.row"></slot>
        </template>
      </el-table-column>
      <template v-else>
        <el-table-column
          :key="idx"
          :align="item.align || 'center'"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width || 50">
          <template v-slot="scope">
            <template v-if="checkVal(scope.row[item.prop])">{{placeholder}}</template>
            <template v-else>{{scope.row[item.prop]}}</template>
          </template>
        </el-table-column>
      </template>
    </template>
    <el-table-column
      v-if="isAdd || isEdit || isLook || isDel"
      align="center"
      label="操作"
      min-width="50">
      <template v-slot="scope">
        <slot name="btnPrepend" :row="scope.row"></slot>
        <el-button type="text" v-if="isAdd" icon="el-icon-plus" @click.stop="handleAdd(scope.row)"></el-button>
        <el-button class="centerBtn" type="text" v-if="isEdit" icon="el-icon-edit-outline" @click.stop="handleEdit(scope.row)"></el-button>
        <el-button type="text" v-if="isLook" icon="el-icon-document" @click.stop="handleLook(scope.row)"></el-button>
        <el-button type="text" v-if="isDel" icon="el-icon-delete" @click.stop="handleDel(scope.row)"></el-button>
        <slot name="btnAppend" :row="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
/**
 * 必填
 * @param {Array} titles 表头数据
 * @param {Array} data 表格显示的数据
 *
 * 选填
 * @param {Array} handler 操作栏显示的按钮类型，['add', 'edit', 'look', 'del']
 * @param {boolean} isShowIndex 是否显示索引
 * @param {boolean} isSelection 是否多选
 * @param {boolean} isRadio 是否单选
 * @param {boolean} isBorder 是否带边框
 * @param {string} rowKey 行数据的 Key
 * @param {object} treeProps 渲染嵌套数据的配置选项
 * @param {boolean} isLazy 是否懒加载子节点数据
 * @param {function} load 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息 Function(row, treeNode, resolve)
 * @param {string} placeholder 当前项数据为''、null、undefined时显示的文本
 * *
 * @function selectionChange 当选择项发生变化时会触发该事件
 * @param {Array} selection 已选中的数组
 * *
 * @function currentChange 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 isRadio 属性
 * @param {Object} row 当前行数据
 * *
 * @function rowClick 当某一行被点击时会触发该事件
 * @param {Object} row
 * @param {Object} column
 * @param {Object} event
 * *
 * @function add 点击添加按钮是触发的事件
 * @param {Object} row
 * *
 * @function edit 点击编辑按钮是触发的事件
 * @param {Object} row
 * *
 * @function look 点击查看按钮是触发的事件
 * @param {Object} row
 * *
 * @function del 点击删除按钮是触发的事件
 * @param {Object} row
 * */

/**
 * 表头数据
 * titles
 * @param {string} label 显示的标题
 * @param {string} prop 对应列内容的字段名，也可以使用 property 属性
 * @param {string} width 对应列的最小宽度，默认50px, 与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
 * @param {string} slot 自定义列的插槽名, 参数为{ row }
 * @param {string} align： 对齐方式  left/center/right  默认center
 * @param {function} render 自定义渲染列(使用render会覆盖slot)， 使用 Vue 的 Render 函数。接受4个参数 (h, row, column, index)。row、column、index，分别指当前行数据，当前列数据，当前是第几行
 * */

/**
 * 操作栏按钮类型
 * handler
 * @param add 添加按钮
 * @param edit 编辑按钮
 * @param look 查看按钮
 * @param del 删除按钮
 *
 * 操作栏扩展插槽
 * btnPrepend 操作栏前置内容
 * btnAppend 操作栏后置内容
 * */
export default {
  name: 'FfTable',
  components: {
    render: _ => import('./render')
  },
  props: {
    data: {
      type: Array,
      default: _ => []
    },
    titles: {
      type: Array,
      default: _ => []
    },
    isShowIndex: {
      type: Boolean,
      default: false
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    isBorder: {
      type: Boolean,
      default: false
    },
    isLazy: {
      type: Boolean,
      default: false
    },
    handler: {
      type: Array,
      default: _ => []
    },
    placeholder: {
      type: String,
      default: '--'
    },
    rowKey: {
      type: String,
      default: ''
    },
    treeProps: {
      type: Object,
      default: _ => ({ hasChildren: 'hasChildren', children: 'children' })
    },
    load: {
      type: Function,
      default: _ => (tree, treeNode, resolve) => {}
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
    checkVal (val) {
      if (val === null || val === undefined || val === '') return true
      else return false
    },
    getIndex (row) {
      return this.data.findIndex(v => v === row)
    },
    rowClick (row, column, event) {
      this.$emit('row-click', row, column, event)
      if (this.isSelection) {
        this.toggleRowSelection(row)
      }
    },
    selectionChange (selection) {
      this.$emit('selectionChange', selection)
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
