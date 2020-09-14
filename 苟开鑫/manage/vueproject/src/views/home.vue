<!--
 * @Author: happy
 * @Date: 2020-09-12 13:35:01
 * @LastEditTime: 2020-09-12 20:35:53
 * @LastEditors: happy
 * @Description: 
-->
<template>
  <div class="home">
   <el-container>
  <el-header>
    <el-row>
      <el-col :span='6'>
        <h3>幼儿园管理系统</h3>
      </el-col>
      <el-col :span='12'><p></p></el-col>
      <el-col :span='6'>
        <p>登录用户名</p>
        
      </el-col>
    </el-row>
  </el-header>
  </el-container>

  <el-container>
    <el-aside width="200px">
      <leftmenu/>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  
  <el-container>
  <el-footer>
    <p>
      2020©幼儿园管理系统
    </p>
  </el-footer>

</el-container>
  </div>
</template>
<script>
// @ is an alias to /src
import leftmenu from '../components/leftmenu'

export default {
  name: 'home',
  components: {
   leftmenu
  }
}
</script>
<style scopted>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    height: 60px;
  }
  .el-header .el-col{
    height: 60px;
    line-height: 60px;
  }
  .el-header .el-col p{
    text-align: right;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    min-height: 500px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
  .el-footer{
    text-align: center;
    line-height: 60px;
  }
</style>
