<template>
  <div class="home">
<el-container>
  <el-header>
    <el-row>
    <el-col :span='12'>
            <h3><p>清华大学附属幼儿园管理平台</p></h3>
        </el-col>
        <el-col :span='6'></el-col>
        <el-col :span='6'><p>hhhh</p></el-col>
   </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <LeftMenu></LeftMenu>
    </el-aside>
    <el-main><router-view></router-view></el-main>
  </el-container>
  <el-footer>
   <p>2020@清华附属幼儿园管理系统</p>
  </el-footer>
</el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import LeftMenu from '../components/LeftMenu.vue'
export default {
  name: 'Home',
  components: {
    LeftMenu
  }
}
</script>
<style>
 .el-header, .el-footer {
    background-color: #0f4e74;
    color: white;
    height: 60px;
  }
 .el-footer{
     text-align: center;
     line-height: 60px;
 }
  .el-header .el-col{
      height: 60px;
      line-height: 60px!important
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
</style>
