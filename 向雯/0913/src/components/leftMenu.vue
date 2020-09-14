<template>
  <div>
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>学校管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">学工系统</el-menu-item>
          <el-menu-item index="1-2">教务系统</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>教师管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">教师信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-setting"></i>学生管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <router-link to="/student">学生信息</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
