<!--
 * @Author: happy
 * @Date: 2020-09-12 13:41:08
 * @LastEditTime: 2020-09-12 16:22:27
 * @LastEditors: happy
 * @Description: 
-->
<template>
  <el-card class="box-card">
    <h1>幼儿园管理系统</h1>
    <h4>登录</h4>
    <p>
      <el-input v-model="user.username" placeholder="请输入用户名" />
    </p>
    <p>
      <el-input v-model="user.pwd" placeholder="密码" type="password" />
    </p>
    <p>
      <el-button type="primary" @click="userlogin">登录</el-button>
    </p>
  </el-card>
</template>

<script>
export default {
  name: "login",
  data: function () {
    return {
      user: {
        username: "",
        pwd: "",
      },
    };
  },
  methods: {
    userlogin() {
      if (this.user.username.length == 0) {
       this.$message({
          showClose: true,
          message: '请输入用户名',
          type: 'warning'
        });
      }else if(this.user.pwd.length==0){
           this.$message({
          showClose: true,
          message: '请输入密码',
          type: 'warning'
        });
      }else{
         //发起请求
         this.$axios.post('/api/userlogin',{
             username:this.user.username,
             pwd:this.user.pwd
         })
         .then((data)=>{
             if(data.data.message==='登录成功'){
                 //跳转
                 this.$router.push('Home')
             }else{
                this.$alert(data.data.message)
             }
         })
         .catch((err)=>{
             console.log(err);
             this.$message.error('请求出错，联系管理员');
         })
      }
    },
  },
};
</script>

<style>
.box-card {
  width: 480px;
  height: 350px;
  margin:auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  
}
.box-card h1,.box-card h4,.box-card p {
    margin-top:20px;
}
</style>