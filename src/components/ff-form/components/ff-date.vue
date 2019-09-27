<template>
  <el-date-picker
    :type="tp"
    v-model="form[prop]"
    :placeholder="placeholder"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :range-separator="rangeSeparator"
    :disabled="disabled"
    :readonly="readonly"
    :format="format"
    :value-format="valueFormat"
    :editable="editable"
  >
  </el-date-picker>
</template>

<script>
export default {
  name: 'FfDate',
  props: {
    form: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    prop () {
      return this.options.prop || ''
    },
    tp () {
      return this.options.tp || 'date'
    },
    placeholder () {
      return this.options.placeholder || '请选择日期'
    },
    startPlaceholder () {
      return this.options.startPlaceholder || '开始日期'
    },
    endPlaceholder () {
      return this.options.endPlaceholder || '结束日期'
    },
    rangeSeparator () {
      return this.options.rangeSeparator || '至'
    },
    disabled () {
      return this.options.disabled || false
    },
    readonly () {
      return this.options.readonly || false
    },
    editable () {
      return this.options.editable || false
    },
    format () {
      if (this.options.format) {
        return this.options.format
      } else {
        if (this.tp === 'date') return 'yyyy-MM-dd'
        else if (this.tp === 'week') return 'yyyy 第 WW 周'
        else return ''
      }
    },
    valueFormat () {
      return this.options.valueFormat || 'yyyy-MM-dd'
    }
  }
}
</script>

<style scoped>
</style>
