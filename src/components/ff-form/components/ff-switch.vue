<template>
  <el-switch
    v-model="form[prop]"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
    :disabled="disabled"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
  >
  </el-switch>
</template>

<script>
export default {
  name: 'FfSwitch',
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
    disabled () {
      return this.options.disabled || false
    },
    activeColor () {
      return this.options.activeColor || '#409EFF'
    },
    inactiveColor () {
      return this.options.inactiveColor || '#C0CCDA'
    },
    activeValue () {
      return this.options.activeValue || true
    },
    inactiveValue () {
      return this.options.inactiveValue || false
    }
  }
}
</script>

<style scoped>
</style>
