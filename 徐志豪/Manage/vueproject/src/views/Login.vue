<template>
  <div>
    <el-card class="box-card">
      <h1>国信安227班幼儿园</h1>
      <h4>登录</h4>
      <p>
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </p>
      <p>
        <el-input v-model="user.pwd" placeholder="请输入密码"></el-input>
      </p>
      <p>
        <el-button type="primary" @click="userLogin">登录</el-button>
      </p>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data: function () {
    return {
      user: {
        username: '',
        pwd: ''
      }
    }
  },
  methods: {
    userLogin () {
      if (this.user.username.length === 0) {
        this.$message({
          showClose: true,
          message: '请输入用户名',
          type: 'warning'
        })
      } else if (this.user.pwd.length === 0) {
        this.$message({
          showClose: true,
          message: '请输入密码',
          type: 'warning'
        })
      } else {
        this.$axios
          .post('/api/userLogin', {
            UserName: this.user.username,
            Pwd: this.user.pwd
          })
          .then((data) => {
            if (data.data.massage === '登陆成功') {
              this.$router.push('home')
            } else {
              this.$alert(data.data.message)
            }
          })
          .catch((err) => {
            console.log(err)
            this.$message.error('请求出错，请联系管理员')
          })
      }
    }
  }
}
</script>
<style scoped>
.box-card {
  width: 480px;
  margin: auto;
}
</style>
