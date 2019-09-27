<template>
  <el-input
    v-if="tp === 'number'"
    class="ff-input"
    v-model.number="form[prop]"
    :type="tp"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :show-password="showPassword"
    οnkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
  ></el-input>
  <el-input
    v-else
    v-model="form[prop]"
    :type="tp"
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
    },
    value () {
      return this.form[this.prop]
    }
  },
  watch: {
    value (v) {
      this.parseVal(v)
    }
  },
  methods: {
    parseVal (v) {
      if (this.tp === 'number' && typeof v !== 'number') {
        this.form[this.prop] = parseFloat(v)
      }
    }
  },
  created () {
    this.parseVal(this.value)
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
