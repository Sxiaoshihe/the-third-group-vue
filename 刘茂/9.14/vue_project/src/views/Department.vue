<template>
  <div>
  <!-- 面包屑-->
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">部门管理</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--添加 -->
    <div>
      <el-card>
        <el-button type="primary" @click="dialogFormVisible = true">添加部门</el-button>
      </el-card>
    </div>
    <!--修改模态框 -->
    <el-dialog title="修改部门" :visible.sync="dialogFormEditVisible">
        <el-form :model="editform">
          <el-form-item label="部门名称">
            <el-input v-model="editform.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门描述">
            <el-input v-model="editform.descript" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" class="elstatus"><br>
            <el-select v-model="editform.status" autocomplete="off">
              <el-option label="有效" value="1">
              </el-option>
              <el-option label="无效" value="o">
              </el-option>
            </el-select>

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveDept">保 存</el-button>
        </div>
      </el-dialog>
    <!--添加模态框 -->
    <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="部门名称">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门描述">
            <el-input v-model="form.descript" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDept">添 加</el-button>
        </div>
      </el-dialog>
    <!-- 列表-->
    <el-table
    :data="deptData"
    height="350"
    border
    style="width: 100%">
    <el-table-column
      type="selection"
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
      <template slot-scope="scope">
        <span :class="scope.row.Status === 1 ? 'statusActive' : 'statusDel'">{{scope.row.Status === 1 ? '有效' : '无效'}}</span>
      </template>

    </el-table-column>
    <el-table-column
      prop="CreateDate"
      :formatter="DateFormatter"
      label="创建时间">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.DeptNo)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data: function () {
    return {
      deptData: [],
      dialogFormVisible: false,
      dialogFormEditVisible: false,
      form: {
        name: '',
        descript: ''
      },
      editform: {
        deptno: '',
        name: '',
        descript: '',
        status: 0
      }
    }
  },
  created: function () {
    this.getDeptList()
  },
  methods: {
    DateFormatter: function (row, column) {
      return new Date(row.CreateDate).toLocaleDateString()
    },
    addDept: function () {
      this.$axios.post('/api/addDept', { DeptName: this.form.name, DeptDescript: this.form.descript })
        .then((response) => {
          var resoult = response.data
          if (resoult.code === 200) {
            this.$alert(resoult.message)
            if (resoult.message === '添加成功') {
              this.getDeptList()
            }
            this.dialogFormVisible = false
          } else {
            this.$alert(resoult.message)
          }
        }).catch(() => {
          this.$alert('请求出错')
        })
    },
    getDeptList: function () {
      this.$axios.post('/api/deptList')
        .then((response) => {
          var resoult = response.data
          if (resoult.code === 200) {
            this.deptData = resoult.data
          } else {
            this.$alert(resoult.message)
          }
        }).catch(() => {

        })
    },
    del: function (id) {
      this.$axios.get('/api/delDept', {
        params: {
          deptNo: id
        }
      }).then((response) => {
        var resoult = response.data
        if (resoult.message === '删除成功') {
          this.getDeptList()
        } else {
          this.$alert(resoult.message)
        }
      }).catch(() => {
        this.$alert('请求出错，请检查')
      })
    },
    edit: function (obj) {
      this.dialogFormEditVisible = true
      this.editform.name = obj.DeptName
      this.editform.deptno = obj.DeptNo
      this.editform.descript = obj.DeptDescript
      this.editform.status = obj.Status
    },
    saveDept: function () {
      this.$axios.post('/api/editDept', {
        DeptNo: this.editform.deptno,
        DeptName: this.editform.name,
        DeptDescript: this.editform.descript,
        Status: this.editform.status
      }).then((response) => {
        var resoult = response.data
        if (resoult.message === '修改成功') {
          this.$alert(resoult.message)
          this.getDeptList()
          this.dialogFormEditVisible = false
        } else {
          this.$alert(resoult.message)
        }
      }).catch(() => {
        this.$alert('请求出错')
      })
    }
  },
  mounted: function () {}
}
</script>

<style>
  .el-card{
    margin-top: 20px;
    text-align: left;
  }
  .statusActive{
    padding: 5px 10px;
    color:white;
    background-color: green;
  }
  .statusDel{
    padding: 5px 10px;
    color:white;
    background-color: red;
  }
  .elstatus{
    text-align: left;
  }

</style>
