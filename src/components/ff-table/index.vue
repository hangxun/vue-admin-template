<template>
  <div class="ff-table">
    <div class="export">
      <el-dropdown v-if="exportFile">
        <el-button type="primary">
          导出<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exportExcel">excel</el-dropdown-item>
          <el-dropdown-item @click.native="exportCsv">csv</el-dropdown-item>
          <el-dropdown-item @click.native="exportPdf">pdf</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-table
      v-if="tableShow"
      v-set-id
      class="ff-el-table"
      ref="table"
      :header-cell-class-name="_headerCellClassName"
      :data="data"
      :border="isBorder"
      :highlight-current-row="isRadio"
      :row-key="rowKey"
      :tree-props="treeProps"
      :lazy="lazy"
      :load="load"
      @row-click="_rowClick"
      @row-dblclick="_rowDblclick"
      @selection-change="_selectionChange"
      @current-change="_handleCurrentChange"
      @sort-change="_sortChange"
    >
      <el-table-column
        v-if="isSelection"
        align="center"
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        v-if="isShowIndex"
        type="index"
        align="center"
        width="50">
      </el-table-column>
      <ff-table-column
        v-for="item in titles"
        :key="item.prop"
        :item="item"
        :align="align"
        :data="data"
        :placeholder="placeholder"
      >
        <template #[item.slot]="{ row }">
          <slot :name="item.slot" :row="row"></slot>
        </template>
        <template #[`header-${item.prop}`]="{ column }" v-if="_hasHeader(item.prop)">
          <slot :name="'header-' + item.prop" :column="column"></slot>
        </template>
      </ff-table-column>
      <el-table-column
        v-if="handlerShow"
        align="center"
        label="操作"
        min-width="50">
        <template v-slot="scope">
          <slot name="btnPrepend" :row="scope.row"></slot>
          <el-button type="text" v-if="isAdd" icon="el-icon-plus" @click.stop="_handleAdd(scope.row)"></el-button>
          <el-button class="centerBtn" type="text" v-if="isEdit" icon="el-icon-edit-outline" @click.stop="_handleEdit(scope.row)"></el-button>
          <el-button type="text" v-if="isLook" icon="el-icon-document" @click.stop="_handleLook(scope.row)"></el-button>
          <el-button type="text" v-if="isDel" icon="el-icon-delete" @click.stop="_handleDel(scope.row)"></el-button>
          <slot name="btnAppend" :row="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column v-if="columControl" width="50">
        <template #header="{ row }">
          <el-button icon="el-icon-menu" size="mini" circle @click="controlShow = !controlShow"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="字段显隐控制"
      :visible.sync="controlShow"
      class="dialogCustom"
      width="20%"
      :before-close="_beforeCloseControl"
    >
      <el-checkbox-group v-model="selection">
        <el-checkbox v-for="(check, index) in titles" :key="index" :label="check.prop" style="display: block;margin: 10px;">{{check.label}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="_cancelControl">取 消</el-button>
        <el-button size="medium" type="primary" @click="_confirmControl">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
   * 必须参数
   * @param {Array} titles 表头数据
   * @param {Array} data 表格显示的数据
   *
   * 可选参数
   * @param {Array|string} handler 操作栏显示的按钮类型，数组或“，”隔开的字符串，['add', 'edit', 'look', 'del']
   * @param {boolean} is-show-index 是否显示索引
   * @param {boolean} is-selection 是否多选
   * @param {boolean} is-radio 是否单选
   * @param {boolean} is-border 是否带边框
   * @param {boolean} drop-column 表格列是否可拖拽
   * @param {boolean} drop-row 表格行是否可拖拽， 需要设置rowKey
   * @param {boolean} colum-control 是否显示列控制按钮
   * @param {string} row-key 行数据的 Key（唯一标识）
   * @param {object} tree-props 渲染嵌套数据的配置选项, 默认{ hasChildren: 'hasChildren', children: 'children' }
   * @param {boolean} lazy 是否懒加载子节点数据
   * @param {function} load 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息 Function(row, treeNode, resolve)
   * @param {string} placeholder 当前项数据为''、null、undefined时显示的文本
   * @param {string} align 对齐方式
   * @param {boolean} export-file 是否显示导出按钮
   * *
   * @function selection-change 当选择项发生变化时会触发该事件
   * @param {Array} selection 已选中的数组
   * *
   * @function current-change 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 isRadio 属性
   * @param {Object} row 当前行数据
   * *
   * @function row-click 当某一行被点击时会触发该事件
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
   * @param {string} prop 对应列内容的字段名，也可以使用 property 属性, 如果使用拖拽则不能为空
   * @param {string} width 对应列的最小宽度，默认50px, 与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
   * @param {string} slot 自定义列的插槽名, 参数为{ row }
   * @param {string} align： 对齐方式  left/center/right  默认center
   * @param {boolean} showTooltip 当内容过长被隐藏时显示 tooltip
   * @param {function} render 自定义渲染列(使用render会覆盖slot)， 使用 Vue 的 Render 函数。接受4个参数 (h, row, column, index)。row、column、index，分别指当前行数据，当前列数据，当前是第几行
   * @param {function} formatter 用来格式化内容 Function(row, column, cellValue, index)
   * @param {boolean|string} sortable 是否排序，可选值true, false, 'custom'
   * @param {string|Array|function} sortBy 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推
   * @param {function} sortMethod 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致
   *
   * 自定义表头
   * 在标签中直接插入插槽名为header-[prop], 参数为{ column }
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
   * btnPrepend 操作栏前置内容, 参数为{ row }
   * btnAppend 操作栏后置内容, 参数为{ row }
   * */

/**
   * Methods
   * exportExcel 用于导出excel
   * exportCsv 用于导出csv
   * exportPdf 用于导出pdf
   * */
import Sortable from 'sortablejs'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import trim from 'lodash/trim'
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'FfTable',
  components: {
    render: _ => import('./render'),
    'ff-table-column': _ => import('./ff-table-column')
  },
  directives: {
    setId (el, binding, vnode) {
      vnode.context.$nextTick(() => {
        let aTh = el.getElementsByTagName('th')
        let thArr = Array.from(aTh)
        thArr.forEach((th, idx) => {
          let prop = Array.from(th.classList).find(v => v.includes('title-'))
          th.dataset.id = prop ? prop.replace('title-', '') : idx
        })
      })
    }
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
    lazy: {
      type: Boolean,
      default: false
    },
    dropColumn: {
      type: Boolean,
      default: true
    },
    dropRow: {
      type: Boolean,
      default: false
    },
    columControl: {
      type: Boolean,
      default: false
    },
    exportFile: {
      type: Boolean,
      default: false
    },
    handler: {
      type: [Array, String],
      default: _ => []
    },
    placeholder: {
      type: String,
      default: '--'
    },
    rowKey: String,
    treeProps: {
      type: Object,
      default: _ => ({ hasChildren: 'hasChildren', children: 'children' })
    },
    load: Function,
    align: {
      type: String,
      default: 'center'
    }
  },
  data () {
    return {
      controlShow: false,
      selection: [],
      oldSelection: [],
      tableShow: true
    }
  },
  computed: {
    handleList () {
      let handle = this.handler
      if (typeof handle === 'string') return handle.split(',').map(v => trim(v))
      else return handle
    },
    isAdd () {
      return this.handleList.includes('add')
    },
    isEdit () {
      return this.handleList.includes('edit')
    },
    isLook () {
      return this.handleList.includes('look')
    },
    isDel () {
      return this.handleList.includes('del')
    },
    isHasHandlerSlot () {
      let slots = Object.keys(this.$scopedSlots)
      return slots.some(v => v === 'btnPrepend' || v === 'btnAppend')
    },
    handlerShow () {
      const handlerFlags = [this.isHasHandlerSlot, this.isAdd, this.isEdit, this.isLook, this.isDel]
      return handlerFlags.some(v => v)
    }
  },
  watch: {
    titles: {
      handler () {
        this._syncTitles()
      },
      immediate: true,
      deep: true
    },
    tableShow (b) {
      if (b) {
        this.$nextTick(() => {
          this._columnDrop()
          this._rowDrop()
        })
      }
    }
  },
  methods: {
    _headerCellClassName ({ row, column, rowIndex, columnIndex }) {
      return column.property ? 'title-' + column.property : ''
    },
    _hasHeader (prop) {
      let slots = Object.keys(this.$scopedSlots)
      return slots.includes(`header-${prop}`)
    },
    _checkVal (val) {
      if (val === null || val === undefined || val === '') return true
      else return false
    },
    _getIndex (row) {
      return this.data.findIndex(v => v === row)
    },
    _rowClick (row, column, event) {
      this.$emit('row-click', row, column, event)
      if (this.isSelection) {
        this.toggleRowSelection(row)
      }
    },
    _rowDblclick (row, column, event) {
      this.$emit('row-dblclick', row, column, event)
    },
    _selectionChange (selection) {
      this.$emit('selection-change', selection)
    },
    _handleCurrentChange (row) {
      this.$emit('current-change', row)
    },
    _sortChange ({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order })
    },
    toggleRowSelection (row) {
      this.$refs.table.toggleRowSelection(row)
    },
    _handleAdd (row) {
      this.$emit('add', row)
    },
    _handleEdit (row) {
      this.$emit('edit', row)
    },
    _handleLook (row) {
      this.$emit('look', row)
    },
    _handleDel (row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('del', row)
      }).catch(() => {
      })
    },
    _findParent (prop) {
      let parent
      const findParent = arr => {
        let p = arr.find(v => v.children && v.children.map(c => c.prop).includes(prop))
        if (p) {
          parent = p
        } else {
          arr.forEach(v => {
            if (v.children) {
              findParent(v.children)
            }
          })
        }
      }
      findParent(this.titles)
      return parent
    },
    _columnDrop () {
      if (this.dropColumn) {
        let oldSort
        const oTable = this.$refs.table.$el
        setTimeout(_ => {
          const trs = Array.from(oTable.querySelectorAll('.el-table__header-wrapper tr'))
          trs.forEach(tr => {
            let sortable = Sortable.create(tr, {
              animation: 180,
              delay: 0,
              dataIdAttr: 'data-id',
              handle: '.allow-drop-column',
              onStart: e => {
                oldSort = sortable.toArray()
              },
              onEnd: e => {
                let oldIndex = e.oldIndex
                let newIndex = e.newIndex
                if (oldIndex === newIndex) return
                const classList = e.item.classList
                const targetClass = classList[classList.length - 1].replace('title-', '')
                const targetParent = this._findParent(targetClass)
                if (targetParent) {
                  let titles = targetParent.children
                  let oldTitIndex = titles.findIndex(v => v.prop === oldSort[oldIndex])
                  let newTitIndex = titles.findIndex(v => v.prop === oldSort[newIndex])
                  if (oldTitIndex === -1 || newTitIndex === -1) {
                    sortable.sort(oldSort)
                  } else {
                    let oldTit = titles.splice(oldTitIndex, 1)
                    titles.splice(newTitIndex, 0, ...oldTit)
                    this.tableShow = false
                    this.$nextTick(() => {
                      this.tableShow = true
                    })
                  }
                } else {
                  let oldTitIndex = this.titles.findIndex(v => v.prop === oldSort[oldIndex])
                  let newTitIndex = this.titles.findIndex(v => v.prop === oldSort[newIndex])
                  if (oldTitIndex === -1 || newTitIndex === -1) {
                    sortable.sort(oldSort)
                  } else {
                    let oldTit = this.titles.splice(oldTitIndex, 1)
                    this.titles.splice(newTitIndex, 0, ...oldTit)
                    this.tableShow = false
                    this.$nextTick(() => {
                      this.tableShow = true
                    })
                  }
                }
              }
            })
          })
        }, 200)
      }
    },
    _rowDrop () {
      if (this.dropRow) {
        const oTable = this.$refs.table.$el
        const tbody = oTable.querySelector('.el-table__body-wrapper tbody')
        Sortable.create(tbody, {
          animation: 180,
          delay: 0,
          onEnd: e => {
            let oldTit = this.data.splice(e.oldIndex, 1)
            this.data.splice(e.newIndex, 0, ...oldTit)
          }
        })
      }
    },
    _syncTitles () {
      let selection = this.titles.filter(v => !v.hidden).map(c => c.prop)
      this.selection = selection
      this.oldSelection = selection
    },
    _setHiddenTitle () {
      this.titles.forEach(c => {
        if (!this.selection.includes(c.prop)) {
          this.$set(c, 'hidden', true)
        } else {
          Reflect.deleteProperty(c, 'hidden')
        }
      })
    },
    _confirmControl () {
      this._setHiddenTitle()
      this.controlShow = false
      this.oldSelection = cloneDeep(this.selection)
    },
    _cancelControl () {
      this.controlShow = false
      this.selection = cloneDeep(this.oldSelection)
    },
    _beforeCloseControl (done) {
      this.selection = cloneDeep(this.oldSelection)
      done()
    },
    openMsgBox (cb) {
      this.$prompt('请输入导出文件名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: `导出文件_${Date.now()}`
      }).then(({ value }) => {
        cb && cb(value)
      })
    },
    exportExcel () {
      this.openMsgBox(dirname => {
        this._exportFile(dirname, 'xlsx')
      })
    },
    exportCsv () {
      this.openMsgBox(dirname => {
        this._exportFile(dirname, 'csv')
      })
    },
    _exportFile (dirname, suffix) {
      var wb = XLSX.utils.table_to_book(this.$refs.table.$el)
      var wbout = XLSX.write(wb, { bookType: suffix, bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${dirname}.${suffix}`)
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    exportPdf () {
      this.openMsgBox(dirname => {
        this._exportPdf(dirname)
      })
    },
    _exportPdf (dirname) {
      html2Canvas(this.$refs.table.$el, {
        allowTaint: true
      }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 586 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 586 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(dirname + '.pdf')
      }
      )
    }
  },
  mounted () {
    this._columnDrop()
    this._rowDrop()
  }
}
</script>

<style scoped>
  .ff-el-table {
    width: 100%;
  }
  .centerBtn {
    margin-left: 20px;
    margin-right: 10px;
  }
</style>
