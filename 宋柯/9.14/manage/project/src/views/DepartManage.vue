<template>
  <div>
  <!--面包屑-->
    <div>
     <el-breadcrumb separator="/">
       <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
       <el-breadcrumb-item>部门管理</el-breadcrumb-item>
     </el-breadcrumb>
    </div>
    <!--操作-->
    <div>
        <el-button type="primary" @click="dialogFormVisible = true">添加部门</el-button>
        <!--添加对话框-->
        <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="部门名称">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="部门描述">
              <el-input v-model="form.descript" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click='addDepartment'>添 加</el-button>
          </div>
        </el-dialog>
        <!--修改对话框-->
        <el-dialog title="修改部门" :visible.sync="dialogFormEditVisible">
          <el-form :model="editform">
            <el-form-item label="部门名称">
              <el-input v-model="editform.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="部门描述">
              <el-input v-model="editform.descript" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model='editform.status' auto-complete="off">
                    <el-option label='有效' value='1'>
                    </el-option>
                    <el-option label='无效' value='0'>
                    </el-option>
                </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click='saveDepart'>保 存</el-button>
          </div>
        </el-dialog>
    </div>
    <!--列表-->
    <el-table
    :data="departData"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      type='selection'
      width="50">
    </el-table-column>
    <el-table-column
      prop="DeptNo"
      label="部门编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="DeptName"
      label="部门名称">
    </el-table-column>
    <el-table-column
      prop="DeptDescript"
      label="描述">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope='scope'>
            <span :class="scope.row.Status===1?'statusActive':'statusDel'">{{scope.row.Status===1?'有效':'无效'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="CreateDate"
          :formatter="DateHandle"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope='scope'>
             <el-button type="primary" icon="el-icon-edit" circle @click='edit(scope.row)'></el-button>
             <el-button type="danger" icon="el-icon-delete" circle @click='del(scope.row.DeptNo)'></el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name: 'DepartManage',
  data () {
    return {
      departData: [],
      dialogFormVisible: false,
      dialogFormEditVisible: false,
      form: {
        name: '',
        descript: ''
      },
      editform: {
        deptNo: '',
        name: '',
        descript: '',
        status: 0
      }
    }
  },
  created: function () {
  // 向后端服务器请求数据
    this.getDepartList()
  },
  methods: {
    DateHandle: function (row, column) {
      return new Date(row.CreateDate).toLocaleDateString()
    },
    addDepartment: function () {
      // 1.获取数据到服务器进行添加,接受服务器响应
      this.$axios.post('/api/addDepart', { deptName: this.form.name, descript: this.form.descript })
        .then((response) => {
          var result = response.data
          if (result.code === 200) {
            this.$alert(result.message)
            if (result.message === '添加成功') {
              this.getDepartList()
            }
            // 2.添加对话框取消
            this.dialogFormVisible = false
          } else {
            this.$alert(result.message)
          }
        }).catch(() => {
          this.$alert('请求出错')
        })
    },
    getDepartList: function () {
      this.$axios.post('/api/departlist').then((response) => {
        var result = response.data
        if (result.code === 200) {
          this.departData = result.data
        } else {
          this.$alert(result.message)
        }
      }).catch(() => {

      })
    },
    del: function (deptNo) {
      // 发起一个请求到服务器，让服务器删除这条数据
      this.$axios.get('/api/delDepart', {
        params: {
          deptNo: deptNo
        }
      }).then((response) => {
        var result = response.data
        if (result.message === '删除成功') {
          this.getDepartList()
        } else {
          this.$alert(result.message)
        }
      }).catch(() => {
        this.$alert('请求出错，请检查')
      })
    },
    edit: function (obj) {
      console.log(obj)
      this.dialogFormEditVisible = true
      this.editform.name = obj.DeptName
      this.editform.descript = obj.DeptDescript
      this.editform.status = obj.Status
    },
    saveDepart: function () {
      // 将修改数据发给服务器，服务器接收响应并处理
      this.$axios.post('/api/editDepart', {
        deptNo: this.editform.deptNo,
        deptName: this.editform.name,
        deptDescript: this.editform.descript,
        status: this.editform.status
      }).then((response) => {
        var result = response.data
        if (result.message === '修改成功') {
          this.$alert(result.message)
          this.getDepartList()
        } else {
          this.$alert(result.message)
        }
      }).catch((response) => {
        this.$alert('请求出错')
      })
    }
  }
}
</script>

<style>
.el-main{
 line-height: 16px!important
}
.statusActive{
  padding: 5px 10px;
  color: white;
  background-color: green;
}
.statusDel{
  padding: 5px 10px;
  color: white;
  background-color: red;
}
</style>
