<template>
   <el-input
    v-if="tp === 'number'"
    :type="tp"
    v-model.number="form[prop]"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :show-password="showPassword"
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
      let tp = this.options.kind
      return tp === 'int' ? 'number' : tp
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
  methods: {
    watchValue () {
      this.$watch(() => this.form[this.prop], {
        handler (val) {
          if (typeof val !== 'number' && val) {
            val = val.replace(/[\D]/g, '')
          }
          if (val || val === 0) this.$set(this.form, this.prop, val)
          else this.$set(this.form, this.prop, '')
        },
        immediate: true
      })
    }
  },
  mounted () {
    if (this.options.tp === 'number') {
      this.watchValue()
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
