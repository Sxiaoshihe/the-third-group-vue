<template>
  <div id="add">
    <el-button type="primary" @click="dialogFormVisible = true">添加部门</el-button>
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
    <el-form :model="add">
      <el-form-item label="部门编号" :label-width="formLabelWidth">
        <el-input v-model="add.department_id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门名称" :label-width="formLabelWidth">
        <el-input v-model="add.department_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="add.department_describe" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addDepartment">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Add",
    data() {
      return {
        dialogFormVisible: false,
        add: {
          department_id: '',
          department_name: '',
          department_describe: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      // 添加部门
      addDepartment() {
        let tempData = JSON.parse(JSON.stringify(this.add));
        tempData.department_status = true;
        tempData.department_create_date = new Date().toLocaleDateString();
        // 传到父组件
        this.$emit('addData',tempData);
        this.add.department_id = '';
        this.add.department_name = '';
        this.add.department_describe = '';
        this.dialogFormVisible = false;
      }
    }
  }
</script>

<style scoped>
  #add {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    background: white;
    line-height: 60px;
    padding-left: 10px;
  }

</style>