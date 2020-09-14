<template>
    <div id="nav">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1" class="o-margin">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span>基础数据</span>
              </template>
              <el-menu-item-group>
                <template slot="title"></template>
                <el-menu-item index="1-1">部门管理</el-menu-item>
                <el-menu-item index="1-2">职工管理</el-menu-item>
                <el-menu-item index="1-3">班级管理</el-menu-item>
                <el-menu-item index="1-4">学生管理</el-menu-item>
                <el-menu-item index="1-5">数据导出</el-menu-item>
                <el-menu-item index="1-6">
                  <i class="el-icon-picture"></i>
                  照片墙
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2" class="o-margin">
              <i class="el-icon-menu"></i>
              <span slot="title">考勤管理</span>
            </el-menu-item>
            <el-menu-item index="3" class="o-margin">
              <i class="el-icon-document"></i>
              <span slot="title">公告管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    name: "Nav",
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  #nav {
    background: gray;
  }
  .o-margin {
    margin-left: 15px;
  }

</style>