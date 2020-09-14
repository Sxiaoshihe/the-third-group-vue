<!--
 * @Author: happy
 * @Date: 2020-09-12 15:01:42
 * @LastEditTime: 2020-09-12 16:50:10
 * @LastEditors: happy
 * @Description: 
-->
<template>
  <el-menu>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>基础数据</template>
          <el-menu-item index="1-1"><router-link to="/deptmanage">部门管理</router-link></el-menu-item>
          <el-menu-item index="1-2">职工管理</el-menu-item>
          <el-menu-item index="1-3">班级管理</el-menu-item>
          <el-menu-item index="1-4">学生管理</el-menu-item>
          <el-menu-item index="1-5">数据导出</el-menu-item>
      </el-submenu>
      <el-menu-item index="2"><i class="el-icon-picture-outline"></i>照片墙</el-menu-item>
      <el-menu-item index="3"><i class="el-icon-time"></i>考勤管理</el-menu-item>
      <el-menu-item index="4"><i class="el-icon-bell"></i>公告管理</el-menu-item>
      
    </el-menu>
</template>

<script>
export default {
name:'leftmenu',
data() {
    return {
        
    }
},
}
</script>

<style>

</style>