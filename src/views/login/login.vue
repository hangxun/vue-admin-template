<template>
  <div class="login">
    <ff-form
      ref="loginForm"
      :form="form"
      :config="config"
      labelWidth="0"
      :hideRequiredAsterisk="false"
      :rules="rules"
    >
      <el-button type="primary" @click="handleLogin" style="width: 100%;">登 录</el-button>
    </ff-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        passwd: ''
      },
      config: [
        { type: 'input', prop: 'username', placeholder: '请输入用户名' },
        { type: 'input', prop: 'passwd', placeholder: '请输入用户密码', tp: 'password' }
      ],
      rules: {
        // username: [
        //   { required: true, message: '请输入用户名', trigger: 'blur' }
        // ],
        // passwd: [
        //   { required: true, message: '请输入用户密码', trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm._validate().then(async _ => {
        await this.$store.dispatch('addAsyncRoutes')
        this.$router.push({ name: 'menu2' })
      }).catch(e => e)
    }
  }
}
</script>

<style scoped>
  .login {
    width: 450px;
    border: 1px solid #ccc;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
