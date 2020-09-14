<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row>
        <el-col :span="6">
          <h3>国信安幼儿园管理平台</h3>
        </el-col>
        <el-col :span="12"><p></p></el-col>
        <el-col :span="6">
          <p>qqqqqqqq</p>
        </el-col>
        </el-row>

      </el-header>
      <el-container>
        <el-aside width="200px">
          <LeftMenu />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer>
        <p>管理系统</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import LeftMenu from './../components/LeftMenu.vue'

export default {
  name: 'Home',
  components: {
    LeftMenu
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #39C2F0;
    color: white;
    height: 60px;
  }
  .el-header .el-col{
    height: 60px;
    line-height: 60px;
  }
  .el-header .el-col p{
    text-align:right;
  }
  .el-footer{
    text-align:center;
    line-height:60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    min-height:500px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
</style>
