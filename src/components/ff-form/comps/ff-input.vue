<template>
  <el-input
    v-if="tp === 'number'"
    class="ff-input"
    type="number"
    v-model.number="form[prop]"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :show-password="showPassword"
    οnkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
  ></el-input>
  <el-input
    v-else
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
  name: 'FfInput',
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

<style>
  .ff-input input::-webkit-outer-spin-button,
  .ff-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .ff-input input[type="number"]{
    -moz-appearance: textfield;
  }
</style>
