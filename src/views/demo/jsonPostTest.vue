<template>
  <div class="jsonPostTest">
    <ff-form
      :form="form"
      :config="config"
      isSub
      @submit="handleSubmit"
    >
      <template #avatar="{ form }">
        <el-radio-group v-model="form.avatar">
          <el-radio style="margin-bottom: 10px;" label="el-icon-user-solid"></el-radio>
          <el-radio style="margin-bottom: 10px;" label="el-icon-user"></el-radio>
          <el-radio style="margin-bottom: 10px;" label="el-icon-s-promotion"></el-radio>
        </el-radio-group>
      </template>
    </ff-form>
  </div>
</template>

<script>
import { addUser } from '@/api/user'
export default {
  name: 'jsonPostTest',
  title: 'json-server-post',
  icon: 'el-icon-sell',
  data () {
    return {
      form: {
        avatar: 'el-icon-user'
      },
      config: [
        { type: 'input', prop: 'name', label: 'name' },
        { type: 'input', prop: 'age', label: 'age' },
        { label: 'avatar', slot: 'avatar' }
      ]
    }
  },
  methods: {
    handleSubmit () {
      addUser(this.form)
    }
  }
}
</script>

<style scoped>
  .jsonPostTest {
    width: 500px;
    margin: 0 auto;
  }
</style>
