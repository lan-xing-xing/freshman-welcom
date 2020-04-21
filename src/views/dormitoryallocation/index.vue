<template>
  <el-card class="box-card">
    <div class="info_table">
      <el-table
        v-loading="listLoading"
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          label="可分配宿舍"
          prop="roomName"
        />
        <el-table-column
          label="所属楼栋"
          prop="dormitoryName"
        />
        <el-table-column
          label="最大数量"
          prop="max"
        />
        <el-table-column
          label="已有数量"
          prop="haveNum"
        />
        <el-table-column label="添加学生">
          <template slot-scope="scope">
            <el-button icon="el-icon-plus" type="primary" size="mini" circle @click="addStudent(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加学生" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="right">
        <el-form-item label="学号" label-width="80px">
          <el-input v-model="form.studentId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postStudent">确 认</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getList } from '@/api/table'
import { postForm } from '@/api/form'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tableData: [],
      listLoading: '',
      roomId: 0,
      dialogFormVisible: false,
      form: {
        studentId: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'path'
    ])
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList('/queryRoom' + this.path).then(response => {
        this.tableData = response.data
        this.listLoading = false
      })
    },
    addStudent(index, row) {
      this.dialogFormVisible = true
      this.roomId = row.roomId
    },
    postStudent() {
      this.dialogFormVisible = false
      const data = {
        'roomId': this.roomId,
        'studentId': this.form.studentId
      }
      postForm('/addStudentToRoom', data).then(response => {
        console.log(response.data)
      })
    }
  }
}
</script>

<style scoped>
  .box-card {
    width: 99%;
    max-width: 100%;
    margin: 20px auto;
  }
  .info_table{
    margin-top: 20px;
  }
</style>
