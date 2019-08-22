<template>
  <el-select
    v-model="form[prop]"
    :disabled="disabled"
    :placeholder="placeholder"
  >
    <el-option
      v-for="item in opts"
      :key="item[props.value]"
      :label="item[props.label]"
      :value="item[props.value]">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ff-select',
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
    props () {
      return this.options.props || { label: 'label', value: 'value' }
    },
    opts () {
      return this.options.opts || []
    },
    placeholder () {
      return this.options.placeholder || ''
    },
    disabled () {
      return this.options.disabled || false
    }
  }
}
</script>

<style scoped>
</style>
