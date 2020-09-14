<template>
  <div>
     <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>基础数据</template>
            <el-menu-item index="1-1"><i class="el-icon-message"></i><router-link to='/DepartManage'>部门管理</router-link></el-menu-item>
            <el-menu-item index="1-1"><i class="el-icon-message"></i>职工管理</el-menu-item>
            <el-menu-item index="1-1"><i class="el-icon-message"></i>班级管理</el-menu-item>
            <el-menu-item index="1-1"><i class="el-icon-message"></i>学生管理</el-menu-item>
            <el-menu-item index="1-1"><i class="el-icon-message"></i>数据导出</el-menu-item>
            </el-submenu>
          <el-menu-item index="2"><i class="el-icon-picture"></i>照片墙</el-menu-item>
          <el-menu-item index="2">考勤</el-menu-item>
          <el-menu-item index="2">公告</el-menu-item>
        </el-menu>
  </div>
</template>

<script>
export default {
  name: 'LeftMenu',
  data: function () {
    return {}
  }
}
</script>

<style>
</style>
