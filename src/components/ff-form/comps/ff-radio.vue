<template>
  <el-radio-group v-model="form[prop]">
    <el-radio
      v-for="item in opts"
      :key="item[props.value]"
      :label="item[props.value]"
      :disabled="disabled"
    >
      {{item[props.label]}}
    </el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'FfRadio',
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
    disabled () {
      return this.options.disabled || false
    }
  }
}
</script>

<style scoped>
</style>
