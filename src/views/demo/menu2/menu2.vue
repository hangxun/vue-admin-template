<template>
  <div class="menu2">
    <ff-form
      :form="form"
      :config="formConfig"
      :rules="rules"
      class="testForm"
      isSub
      isReset
      isCancel
      @submit="handleSub"
      @suberror="suberror"
    >
      <template #slot="{ form }">
          {{form.slot}}
      </template>
    </ff-form>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'menu2',
  data () {
    const props = {
      label: 'title',
      value: 'id'
    }
    const opts = [
      { id: 1, title: 'aaa' },
      { id: 2, title: 'bbb' },
      { id: 3, title: 'ccc' }
    ]
    return {
      form: {
        slot: 'slotslot',
        input2: '123',
        checkbox: [],
        daterange: []
      },
      formConfig: [
        { type: 'input', prop: 'input', label: 'input', placeholder: 'input' },
        { type: 'input', tp: 'number', prop: 'input2', label: 'input2', placeholder: 'input2' },
        { slot: 'slot' },
        { type: 'date', prop: 'date', label: 'date', placeholder: 'date' },
        { type: 'date', tp: 'week', prop: 'week', label: 'week', placeholder: 'week' },
        { type: 'input', tp: 'password', prop: 'password', label: 'password', placeholder: 'password' },
        { type: 'input', tp: 'textarea', prop: 'textarea', label: 'textarea', placeholder: 'textarea' },
        {
          type: 'radio',
          prop: 'radio',
          label: 'radio',
          placeholder: 'radio',
          props,
          opts
        },
        {
          type: 'checkbox',
          prop: 'checkbox',
          label: 'checkbox',
          placeholder: 'checkbox',
          props,
          opts
        },
        {
          type: 'select',
          prop: 'select',
          label: 'select',
          placeholder: 'select',
          props,
          opts
        },
        { type: 'switch', prop: 'switch', label: 'switch', placeholder: 'switch', activeValue: '1', inactiveValue: '0' },
        {
          type: 'date',
          tp: 'daterange',
          prop: 'daterange',
          label: 'daterange',
          startPlaceholder: 'startPlaceholder',
          endPlaceholder: 'endPlaceholder',
          rangeSeparator: '-'
        }
      ],
      rules: {
        input: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSub () {
      console.log('sub')
    },
    suberror (obj) {
      console.log(obj)
    }
  }
}
</script>

<style lang="less">
  .testForm {
    .el-form-item:nth-of-type(1),
    .el-form-item:nth-of-type(2),
    .el-form-item:nth-of-type(4),
    .el-form-item:nth-of-type(5) {
      display: inline-block;
      width: 47%;
    }
  }
</style>
