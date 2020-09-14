<template>
  <div id="content">
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :row-style="{height: '0'}"
      :cell-style="{padding: '0'}"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="部门编号"
        width="120"
      >
        <template slot-scope="scope">{{ scope.row.department_id }}</template>
      </el-table-column>
      <el-table-column
        prop="department_name"
        label="部门名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="department_describe"
        label="描述"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="department_status"
        label="状态"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="o-effective" v-if="scope.row.department_status == true ||scope.row.department_status == 'true'">有效</span>
          <span class="o-invalid" v-else>无效</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="department_create_date"
        label="创建时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="showModify(scope.row)" type="text" size="small" >
            <i class="el-icon-edit o-modify"></i>
          </el-button>
          <el-button @click="deleteTableData(scope.row)" type="text" size="small" >
            <i class="el-icon-delete o-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form :model="modify">
        <el-form-item label="部门编号" :label-width="formLabelWidth">
          <el-input v-model="modify.department_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="modify.department_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="modify.department_describe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-select v-model="modify.department_status" placeholder="请选择该部门状态">
            <el-option label="有效" value="true"></el-option>
            <el-option label="无效" value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doModify">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Content",
    props: {
      tempData: Object
    },
    data() {
      return {
        tableData: [{
          department_id: '1',
          department_name: '财务部',
          department_describe : '管理钱财的部门',
          department_status: false,
          department_create_date: '2020/7/29'
        }, {
          department_id: '2',
          department_name: '运营部',
          department_describe : '运营网站的部门',
          department_status: true,
          department_create_date: '2020/7/29'
        }, {
          department_id: '3',
          department_name: '多媒体部',
          department_describe : '制作多媒体的部门',
          department_status: true,
          department_create_date: '2020/7/29'
        }, {
          department_id: '4',
          department_name: '技术部',
          department_describe : '提供技术的部门',
          department_status: false,
          department_create_date: '2020/7/29'
        }, {
          department_id: '5',
          department_name: '教学部',
          department_describe : '提供教育的部门',
          department_status: false,
          department_create_date: '2020/7/29'
        }],
        multipleSelection: [],
        dialogFormVisible: false,
        modify: {
          department_id: '',
          department_name: '',
          department_describe: '',
          department_status: '',
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteTableData(row) {
        this.open(row);
      },
      open(row) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.forEach((item,index) => {
            if(item.department_id == row.department_id){
              this.tableData.splice(index,1);
            }
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      showModify(row) {
        window.oRow = row; // 方便后面找该数据在数组对应的位置
        this.modify.department_id = row.department_id;
        this.modify.department_name = row.department_name;
        this.modify.department_describe = row.department_describe;
        this.dialogFormVisible = true;
      },
      doModify() {
        // this.modify 装着已经修改的数据
        // window.oRow  装着之前的数据，方便查找对应位置
        this.tableData.forEach((item,index)=>{
          if(item.department_id == window.oRow.department_id){
            let tempData = JSON.parse(JSON.stringify(this.modify));
            tempData.department_create_date = item.department_create_date;
            this.tableData.splice(index,1,tempData);
          }
        });
        this.modify.department_status = '';
        this.dialogFormVisible = false;
      }
    },
    watch: {
      tempData(value) {
        this.tableData.unshift(value);
      }
    }
  }
</script>

<style scoped>
  #content {
    margin-top: 15px;
    margin-bottom: 10000px;
  }
  .o-modify {
    border-radius: 50%;
    background: #00a2ff;
    width: 30px;
    height: 30px;
    line-height: 30px;
    color: white;
    box-sizing: border-box;
  }
  .o-delete {
    border-radius: 50%;
    background: orangered;
    width: 30px;
    height: 30px;
    line-height: 30px;
    color: white;
    box-sizing: border-box;
  }
  .o-effective {
    background: green;
    color: white;
    padding: 3px;
  }
  .o-invalid {
    background: red;
    color: white;
    padding: 3px;
  }


</style>