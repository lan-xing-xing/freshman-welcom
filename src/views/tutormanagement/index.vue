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
          label="班级"
          prop="className"
        />
        <el-table-column
          label="教师编号"
          prop="headteacherId"
        />
        <el-table-column
          label="姓名"
          prop="headteacherName"
        />
        <el-table-column
          label="性别"
          prop="gender"
        />
        <el-table-column
          label="手机号"
          prop="phone"
        />
        <el-table-column
          label="地址"
          prop="address"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改班主任信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="right">
        <el-form-item label="教师编号" label-width="80px">
          <el-input v-model="form.headteacherId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="80px">
          <el-input v-model="form.headteacherName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="80px">
          <el-input v-model="form.gender" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" label-width="80px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="80px">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postTeacher">提 交</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getList } from '@/api/table'
import { postForm } from '../../api/form'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tableData: [],
      listLoading: '',
      form: {
        headteacherId: '',
        headteacherName: '',
        gender: '',
        phone: '',
        address: ''
      },
      dialogFormVisible: false
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
      getList('/queryMajorHeadteacher' + this.path).then(response => {
        this.tableData = response.data
        this.listLoading = false
      })
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.form.headteacherId = row.headteacherId
      this.form.headteacherName = row.headteacherName
      this.form.gender = row.gender
      this.form.phone = row.phone
      this.form.address = row.address
    },
    postTeacher() {
      this.dialogFormVisible = false
      const data = {
        'headteacherId': this.form.headteacherId,
        'headteacherName': this.form.headteacherName,
        'gender': this.form.gender,
        'phone': this.form.phone,
        'address': this.form.address
      }
      postForm('/updateHeadteacherInfo', data).then(response => {
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
