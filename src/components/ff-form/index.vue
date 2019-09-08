<template>
  <div class="ff-form">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :labelWidth="labelWidth"
      :inline="inline"
      :label-position="labelPosition"
      :hide-required-asterisk="hideRequiredAsterisk"
      :size="size"
      :disabled="disabled"
    >
      <template v-for="(item, index) in haveNameConfig">
        <el-form-item
          :key="index"
          v-if="include[index]"
          :label="item.label"
          :prop="item.prop"
          :label-width="item.labelWidth"
        >
          <slot v-if="item.slot" :name="item.slot" :form="form"></slot>
          <component v-else :is="item.componentName" :form="form" :options="item"></component>
        </el-form-item>
      </template>
      <slot></slot>
    </el-form>
    <div class="btn-item" v-if="isSub || isReset || isCancel" label-width="0" style="text-align: center;">
      <el-button v-if="isCancel" @click="handleCancel">{{cancelText}}</el-button>
      <el-button v-if="isReset" @click="handleReset">{{resetText}}</el-button>
      <el-button v-if="isSub" type="primary" @click="handleSubmit">{{subText}}</el-button>
    </div>
  </div>
</template>

<script>
/**
 *必填
 * @param {Object} form 表单数据
 * @param {Array} config 表单配置项
 *
 *选填
 * @param {Object} rules 验证规则
 * @param {string} labelWidth 表单域标签的宽度
 * @param {boolean} inline 是否使用行内表单模式
 * @param {string} labelPosition 表单域标签的位置
 * @param {boolean} hideRequiredAsterisk 是否显示必填字段的标签旁边的红色星号
 * @param {string} size 用于控制该表单内组件的尺寸
 * @param {boolean} disabled 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
 * @param {boolean} isSub 是否显示保存按钮
 * @param {boolean} isReset 是否显示重置按钮
 * @param {boolean} isCancel 是否显示取消按钮
 * @param {string} subText 保存按钮文本
 * @param {string} resetText 保存按钮文本
 * @param {string} cancelText 取消按钮文本
 * @function submit 点击保存校验成功时触发
 * @function reset 点击重置按钮时触发
 * @function cancel 点击重置按钮时触发
 * *
 * @function suberror 点击保存校验失败时触发，
 * @param errData 未通过校验的信息
 * *
 * @function cancel 点击取消按钮时触发
 * */

/**
 * 表单配置项
 * config
 * @param {string} type checkbox、 date、 input、 radio、 select、 switch
 * @param {string} prop form中的属性名
 * @param {string} label 标签文本
 * @param {string} placeholder 输入框占位文本
 * @param {string} labelWidth 当前表单域标签的宽度
 * @param {string} slot 具名插槽name
 *
 *
 * 部分组件特有参数
 * checkbox、 radio、 select
 * @param {Array} opts select、 radio、 checkbox中的选项数组，[{ value: '', label: '' }], 默认属性名value、label, 可在props中修改
 * @param {Object} props 指定选项的值为选项对象的某个属性值{ value: 'newValue', label: 'newLabel' }
 *
 * date
 * @param {string} tp 类型， 可选 year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange
 * @param {string} format 显示在输入框中的格式
 * @param {string} valueFormat 绑定值的格式
 * @param {string} startPlaceholder 范围选择时开始日期的占位内容
 * @param {string} endPlaceholder范围选择时结束日期的占位内容
 * @param {string} rangeSeparator选择范围时的分隔符
 * @param {boolean} readonly 完全只读
 * @param {boolean} editable 文本框是否可输入
 *
 *
 * input
 * @param {string} tp 类型， 可选 text，textarea, password 和其他 原生 input 的 type 值
 * @param {boolean} readonly 完全只读
 * */

import components from './comps/index.js'
import upperFirst from 'lodash/upperFirst'
export default {
  name: 'FfForm',
  components,
  props: {
    form: {
      type: Object,
      required: true
    },
    config: {
      type: Array,
      default: _ => []
    },
    rules: {
      type: Object,
      default: _ => ({})
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    inline: {
      type: Boolean,
      default: false
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    size: {
      type: String,
      default: 'medium'
    },
    isSub: {
      type: Boolean,
      default: false
    },
    subText: {
      type: String,
      default: '保存'
    },
    resetText: {
      type: String,
      default: '重置'
    },
    isReset: {
      type: Boolean,
      default: false
    },
    isCancel: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  data () {
    return {
      initForm: {}
    }
  },
  computed: {
    include () {
      return this.config.map(c => Boolean(c.slot) || components[c.componentName])
    },
    haveNameConfig () {
      let config = this.config
      config.forEach(c => {
        if (c.type) {
          let componentName = 'Ff' + upperFirst(c.type)
          c.componentName = componentName
        }
      })
      return config
    }
  },
  created () {
    this.initForm = this._cloneDeep(this.form)
  },
  methods: {
    _resetForm () {
      this.$refs.form.resetFields()
    },
    _validate () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid, errData) => {
          if (valid) {
            resolve()
          } else {
            reject(errData)
          }
        })
      })
    },
    handleSubmit () {
      this._validate().then(_ => {
        this.$emit('submit')
      }).catch(errData => {
        this.$emit('suberror', errData)
      })
    },
    handleReset () {
      this._resetForm()
      this.$emit('reset')
    },
    handleCancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
</style>
