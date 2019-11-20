<template>
  <el-input
    class="ff-input"
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
      let tp = this.options.tp
      if (!tp || tp === 'number') return 'text'
      else return tp
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
      this.$watch(() => {
        return this.form[this.prop]
      }, {
        handler (val) {
          if (typeof val !== 'number' && val) {
            val = val.replace(/[\D]/g, '')
          }
          if (val || val === 0) this.form[this.prop] = Number(val)
          else this.form[this.prop] = ''
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
