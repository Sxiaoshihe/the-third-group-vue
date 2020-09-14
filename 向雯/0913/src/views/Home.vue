<template>
  <el-container>
    <el-header>
      <h3>向日葵中学学生系统</h3>
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
      <p>@向日葵中学学生系统</p>
    </el-footer>
  </el-container>
</template>

<script>
import LeftMenu from './../components/leftMenu.vue'
export default {
  name: 'Home',
  data () {
    return { }
  },
  components: {
    LeftMenu
  }
}
</script>

<style scoped>
body > .el-container {
  margin-bottom: 40px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-header,.el-footer{
  background-color: #B3C0D1;
  color: #333;
}
.el-footer{
  text-align: center;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
  min-height: 700px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
#home{
  text-align: center;
}
</style>
