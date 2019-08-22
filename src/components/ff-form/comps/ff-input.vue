<template>
  <el-input
    :type="tp"
    v-model="form[prop]"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :show-password="showPassword"
  ></el-input>
</template>

<script>
export default {
  name: 'ff-input',
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
      return this.options.tp || 'text'
    },
    placeholder () {
      return this.options.placeholder || ''
    },
    disabled () {
      return this.options.disabled || false
    },
    readonly () {
      return this.options.readonly || false
    },
    showPassword () {
      return this.options.tp === 'password'
    }
  }
}
</script>

<style scoped>
</style>
