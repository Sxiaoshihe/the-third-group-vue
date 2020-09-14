<template>
  <div id="app" class="o-width">
    <Header/>
    <el-row :gutter="16" class="o-width">
      <el-col :span="4">
        <Nav></Nav>
      </el-col>
      <el-col :span="20">
        <NavTitle/>
        <Add @addData="addData"/>
        <Content :tempData="tempData"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import NavTitle from './components/NavTitle.vue'
import Add from './components/Add.vue'
import Content from './components/Content.vue'
export default {
  name: 'App',
  data() {
    return {
      tempData: {}
    }
  },
  components: {
    Header,
    Nav,
    NavTitle,
    Add,
    Content
  },
  methods: {
    addData(tempData) {
      this.tempData = tempData;
    }
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  html,body {
    height: 100%;
    overflow: hidden;
  }
  #app {
    background: gainsboro;
  }
  .o-width {
    width: 100%;
  }

</style>
