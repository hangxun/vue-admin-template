<template>
  <el-checkbox-group v-model="form[prop]" class="ff-checkbox">
    <el-checkbox
      v-for="item in opts"
      :key="item[props.value]"
      :label="item[props.value]"
      :disabled="disabled"
    >
      {{item[props.label]}}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'ff-checkbox',
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
      return this.options.prop || []
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
  .ff-checkbox {
    display: inline-block;
  }
</style>
