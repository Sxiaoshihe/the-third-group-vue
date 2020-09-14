<template>
  <div>
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生管理</el-breadcrumb-item>
        <el-breadcrumb-item>学生信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 操作 -->
      <el-button type="primary" @click="dialogFormVisible = true" id="btnAdd">添加</el-button>
      <el-dialog title="添加学生信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="学生学号" :label-width="formLabelWidth">
            <el-input v-model="form.stuName" auto-complete="off" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="学生姓名" :label-width="formLabelWidth">
            <el-input v-model="form.stuName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="学生年龄" :label-width="formLabelWidth">
            <el-input v-model="form.stuAge" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="学生班级" :label-width="formLabelWidth">
            <el-select v-model="form.stuClass" placeholder="请选择班级">
              <el-option label="1班" value="1"></el-option>
              <el-option label="2班" value="2"></el-option>
              <el-option label="3班" value="3"></el-option>
              <el-option label="4班" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学生性别" :label-width="formLabelWidth">
            <el-input v-model="form.stuSex" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addStu()">确 定</el-button>
  </div>
      </el-dialog>
    <!-- 列表 -->
    <div>
      <el-table :data="studentList" border style="width: 100%">
        <el-table-column type="selection" width="100"></el-table-column>
        <el-table-column prop="id" label="学号" width="180"></el-table-column>
        <el-table-column prop="stuName" label="姓名" width="180"></el-table-column>
        <el-table-column prop="stuAge" label="年龄" width="180"></el-table-column>
        <el-table-column prop="stuClass" label="班级" width="180"></el-table-column>
        <el-table-column prop="stuSex" label="性别" width="180"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" @click="midStu()"></el-button>
            <el-button type="primary" icon="el-icon-delete" @click="delStu(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      type: 0,
      studentList: [
        {
          id: '',
          stuName: '',
          stuAge: '',
          stuClass: '',
          stuSex: ''
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        stuName: '',
        stuAge: '',
        stuClass: '',
        stuSex: ''
      },
      formLabelWidth: '120px'
    }
  },
  created () {
    this.getStuList()
  },
  methods: {
    // 添加学生的模态框
    addStuBox () {
      this.dialogFormVisible = true
      this.type = -1
    },
    // 添加学生
    addStu () {
      console.log(this.type)
      // -1表示添加学生
      if (this.type === -1) {
        console.log(111111)
        this.$axios.post('/api/addStu', { stuName: this.form.stuName, age: this.form.stuAge, stuClass: this.form.stuClass, sex: this.form.stuSex })
          .then((response) => {
            var result = response.data
            if (result.code === 200) {
              this.getStuList()
              this.dialogFormVisible = false
            } else {
              this.$alert(result.message)
            }
          }).catch(() => {
            this.$alert('请求出错')
          })
      } else if (this.type === 1) {
        this.$axios.post('/api/midStu', { stuName: this.form.stuName, age: this.form.stuAge, stuClass: this.form.stuClass, sex: this.form.stuSex }).then((response) => {
          var result = response.data
          if (result.code === 200) {
            this.getStuList()
            this.dialogFormVisible = false
          } else {
            this.$alert(result.message)
          }
        }).catch(() => {
          this.$alert('服务器请求出错')
        })
      }
    },
    // 删除学生
    delStu (id) {
      this.$axios.get('/api/delStu', {
        params: {
          id: id
        }
      }).then((response) => {
        var result = response.data;
        (result.code === 200) ? this.getStuList() : this.$alert(result.message)
      }).catch(() => {
        this.$alert('服务器请求失败')
      })
    },
    // 修改的模态框
    midStu () {
      this.dialogFormVisible = true
      this.type = 1
    },
    getStuList () {
      // 向后端服务器请求数据
      this.$axios.post('/api/stuList')
        .then((response) => {
          var result = response.data
          if (result.code === 200) {
            this.studentList = result.data
          } else {
            this.$alert(result.message)
          }
        })
        .catch(() => {
          this.$alert('服务器请求失败')
          // this.$message.error('服务器请求失败')
        })
    }
  }
}
</script>

<style>
div {
  text-align: center;
}
</style>
