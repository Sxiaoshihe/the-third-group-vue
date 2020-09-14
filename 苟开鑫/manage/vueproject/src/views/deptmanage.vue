<!--
 * @Author: happy
 * @Date: 2020-09-12 16:32:55
 * @LastEditTime: 2020-09-13 13:05:16
 * @LastEditors: happy
 * @Description: 
-->
<template>
  <div class="dept">
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">部门管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
 </div>
 <!-- 操作 -->
<div>
  <el-card>
     <el-button type="primary" @click="dialogTableVisible = true">添加</el-button>

  </el-card>
 
</div>
      <!-- 列表 -->
      <el-table :data="deptData" height="550" border style="width: 100%">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="DeptNo" label="部门编号"></el-table-column>
        <el-table-column prop="DeptName" label="部门名称"></el-table-column>
        <el-table-column prop="DeptDescript" label="部门描述"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              :class="scope.row.Status===1?'statusactive':'statusdel'"
            >{{scope.row.Status===1?'有效':'无效'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="CreateDate" :formatter="datehandle" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.DeptNo)"></el-button>
          </template>
        </el-table-column>
      </el-table>
   <!-- 添加对话框 -->
   <el-dialog title="添加部门" :visible.sync="dialogTableVisible">
  <el-form :model="form">
    <el-form-item label="部门名称">
      <el-input v-model="form.DeptName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="部门描述">
     <el-input v-model="form.DeptDescript" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="adddept">添加</el-button>
  </div>
</el-dialog>
 <!-- 修改对话框 -->
   <el-dialog title="修改部门" :visible.sync="dialogTableeditVisible">
  <el-form :model="editform">
    <el-form-item label="部门名称">
      <el-input v-model="editform.DeptName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="部门描述">
     <el-input v-model="editform.DeptDescript" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="editform.Status" autocomplete="off">
    <el-option label="有效" :value="1">
    </el-option>
    <el-option label="无效" :value="0">
    </el-option>
  </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableeditVisible = false">取 消</el-button>
    <el-button type="primary" @click="editdept">保存</el-button>
  </div>
</el-dialog> 
  
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      deptData: [],
      dialogTableVisible:false,
      dialogTableeditVisible:false,
      form:{
        DeptName:'',
        DeptDescript:''
      },
      editform:{
        DeptNo:'',
        DeptName:'',
        DeptDescript:'',
        Status:"0"
      }
    };
  },
  created() {
   this.getdeptlist();
  },
  methods: {
    datehandle: function (row, column) {// eslint-disable-line no-unused-vars
      
      return new Date(row.CreateDate).toLocaleDateString();
    },
    studenthandle: function (row, column) {// eslint-disable-line no-unused-vars
      return row.Status === 1 ? "有效" : "无效";
    },
    adddept:function(){
      //获取数据，进行添加
      this.$axios.post('/api/adddept',{DeptName:this.form.DeptName,DeptDescript:this.form.DeptDescript})
      .then((res)=>{
        var result = res.data;
        if(result.code==200){       
          this.$alert(result.message);
          if(result.message=='添加成功'){
            //调用函数不成功，记录this.getdeptlist();
          }
 // 取消对话框 
        }else{
           this.$alert(result.message)
        }
        this.dialogTableVisible = false;
        this.getdeptlist();
      }).catch(()=>{
        this.$alert('请求出错');
      })  
      
    },
  
    getdeptlist:function(){
       //向后端服务器请求数据
    this.$axios
      .post("/api/deptlist")
      .then((res) => {
        var result = res.data;
        if (result.code == 200) {
          this.deptData = result.data;
        } else {
          this.$alert(result.message);
        }
      })
      .catch(() => {});
    },
    del:function(DeptNo){
      this.$axios.get('/api/deldept',{
        params:{
          DeptNo:DeptNo
        }
      }).then((res)=>{
        var result = res.data;
        if(result.message=='删除成功'){
          this.getdeptlist();
        }else{
          this.$alert(result.message);
        }
      }).catch(()=>{
       
      })
    },
    edit:function(obj){
      this.dialogTableeditVisible=true;
      this.editform.DeptNo = obj.DeptNo;
      this.editform.DeptName = obj.DeptName;
      this.editform.DeptDescript = obj.DeptDescript;
      this.editform.Status = obj.Status;
    },
    editdept:function(){
      //将数据发给服务器
      this.$axios.post('/api/editdept',{
        DeptNo:this.editform.DeptNo,
        DeptName:this.editform.DeptName,
        DeptDescript:this.editform.DeptDescript,
        Status:this.editform.Status,
      }).then((res)=>{
        var result = res.data;
        if(result.message==='修改成功'){
          this.$alert(result.message);
          this.getdeptlist();
        }else{
          this.$alert(result.message)
        }
      }).catch(()=>{
        this.$alert('请求出错');
      });
       this.dialogTableeditVisible=false;
    }
  },
};
</script>

<style>
.dept .el-card{
  margin: 20px 0;
  text-align: left;
}
.statusactive {
  padding: 5px 10px;
  color: white;
  background-color: green;
}
.statusdel {
  padding: 5px 10px;
  color: white;
  background-color: red;
}
</style>