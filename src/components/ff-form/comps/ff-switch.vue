<template>
  <el-switch
    v-model="form[prop]"
    :active-color="active"
    :inactive-color="inactive"
    :disabled="disabled"
  >
  </el-switch>
</template>

<script>
export default {
  name: 'ff-switch',
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
    active () {
      return this.options.active || '#13ce66'
    },
    inactive () {
      return this.options.inactive || '#ff4949'
    }
  }
}
</script>

<style scoped>
</style>
