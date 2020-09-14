<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h1>向日葵中学</h1>
    </div>
    <p><el-input v-model="user.username" /></p>
    <p><el-input v-model="user.pwd" type="password" /></p>
    <p><el-button type="primary" @click="login()">登录</el-button></p>
  </el-card>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        pwd: ''
      }
    }
  },
  methods: {
    login () {
      if (this.user.username.length === 0) {
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        })
      } else if (this.user.pwd.length === 0) {
        this.$message({
          message: '请输入密码',
          type: 'warning'
        })
      } else {
        this.$axios.post('/api/userLogin', { userName: this.user.username, password: this.user.pwd })
          .then((data) => {
            if (data.data.code === 200) {
              // 登录成功，就跳转到首页
              this.$router.push('home')
            } else {
              this.$alert(data.data.message)
            }
          }).catch((err) => {
            console.log(err)
            this.$message.error('服务器请求失败')
          })
      }
    }
  }
}
</script>

<style>
.box-card {
  width: 480px;
  margin: auto;
}
</style>
