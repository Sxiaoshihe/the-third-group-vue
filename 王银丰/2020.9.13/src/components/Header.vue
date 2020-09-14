<template>
  <div id="header">
      <span id="content">幼儿管理系统</span>
      <span id="username">YF</span>
  </div>
</template>

<script>
  export default {
      name: "Header"
  }
</script>

<style scoped>
    #header {
        height: 50px;
        width: 100%;
        background: #00a0dc;
        color: white;
        line-height: 50px;
    }
    #content {
        font-size: 20px;
        margin-left: 10px;
    }
    #username {
        position: absolute;
        right: 20px;
    }




</style>