<template>
  <div class="routerSetting">
    <div class="header">
      <el-button @click="batchDel">批量删除</el-button>
      <el-button @click="addClick">新增</el-button>
    </div>
    <ff-table
      :titles="titles"
      :data="data"
      :handler="handler"
      isSelection
      @selectionChange="selectionChange"
      @add="handleAdd"
      @edit="handleEdit"
      @look="handleLook"
      @del="handleDel"
    >
      <template #icon="{ row }">
          <i :class="row.icon"></i>
      </template>
    </ff-table>
    <el-dialog
      v-if="dialogVisible"
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <ff-form
        ref="routerForm"
        :form="form"
        :config="config"
        :rules="rules"
        :disabled="type === 3"
        :isSub="type !== 3"
        isCancel
        :cancelText="type === 3 ? '关闭' : '取消'"
        labelWidth="130px"
        @submit="handleSubmit"
        @cancel="dialogVisible = false"
      >
        <template #icon="{ form }">
          <el-radio-group v-model="form.icon">
            <el-radio style="display: block; margin-bottom: 5px;" label="">无</el-radio>
            <el-radio style="display: block; margin-bottom: 5px;" label="el-icon-setting"><i class="el-icon-setting"></i></el-radio>
            <el-radio style="display: block; margin-bottom: 5px;" label="el-icon-star-off"><i class="el-icon-star-off"></i></el-radio>
            <el-radio style="display: block; margin-bottom: 5px;" label="el-icon-help"><i class="el-icon-help"></i></el-radio>
            <el-radio style="display: block; margin-bottom: 5px;" label="el-icon-picture-outline-round"><i class="el-icon-picture-outline-round"></i></el-radio>
            <el-radio style="display: block; margin-bottom: 5px;" label="el-icon-bell"><i class="el-icon-bell"></i></el-radio>
            <el-radio style="display: block; margin-bottom: 5px;" label="el-icon-cpu"><i class="el-icon-cpu"></i></el-radio>
          </el-radio-group>
        </template>
      </ff-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRoutes, addRoute, delRotue, getRoute, editRoute } from '@/api/requestRoutes'
export default {
  name: 'routerSetting',
  data () {
    return {
      titles: [
        { prop: 'name', label: '路由name' },
        { prop: 'pname', label: '父路由name' },
        { prop: 'title', label: '标题' },
        { prop: 'icon', label: '图标', slot: 'icon' },
        { prop: 'hidden', label: '是否在菜单中隐藏' }
      ],
      handler: ['add', 'edit', 'look', 'del'],
      data: [],
      selection: [],
      type: 1, // 1新增 2修改 3查看
      dialogVisible: false,
      form: {
        name: '',
        pname: '',
        title: '',
        icon: '',
        hidden: false
      },
      config: [
        { type: 'input', prop: 'name', label: '路由name', placeholder: '请输入路由name' },
        { type: 'input', prop: 'pname', label: '父路由name', placeholder: '请输入父路由name' },
        { type: 'input', prop: 'title', label: '标题', placeholder: '请输入标题' },
        { type: 'input', prop: 'icon', label: '图标', placeholder: '请输入图标class' },
        // { prop: 'icon', label: '图标', slot: 'icon' },
        { type: 'switch', prop: 'hidden', label: '是否在菜单中隐藏', placeholder: '请输入hidden' }
      ],
      rules: {
        name: [
          { required: true, message: '请输入name', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getRoutes()
  },
  methods: {
    async getRoutes () {
      let { data } = await this._request(getRoutes)
      this.data = data
    },
    addClick () {
      this.type = 1
      this.dialogVisible = !this.dialogVisible
    },
    async handleSubmit () {
      if (this.type === 1) {
        await this._request(addRoute, this.form, true)
      } else {
        await this._request(editRoute, { id: this.form.id, form: this.form }, true)
      }
      this.getRoutes()
      this.dialogVisible = !this.dialogVisible
    },
    handleAdd (row) {
      this.type = 1
      this.form.pname = row.name
      this.dialogVisible = !this.dialogVisible
    },
    async getRoute (id) {
      let { data } = await this._request(getRoute, id)
      this.form = data
    },
    async handleEdit (row) {
      this.type = 2
      await this.getRoute(row.id)
      this.dialogVisible = !this.dialogVisible
    },
    async handleLook (row) {
      this.type = 3
      await this.getRoute(row.id)
      this.dialogVisible = !this.dialogVisible
    },
    async handleDel (row) {
      await this._request(delRotue, row.id, true)
      this.getRoutes()
    },
    batchDel () {
      this._delConfirm(_ => {
        let delCount = 0
        this.selection.forEach(async s => {
          let isLast = ++delCount === this.selection.length
          await this._request(delRotue, s.id, isLast)
          if (isLast) this.getRoutes()
        })
      })
    },
    selectionChange (selection) {
      this.selection = selection
    }
  }
}
</script>

<style scoped>
  .header {
    padding: 20px;
    text-align: right;
  }
</style>
