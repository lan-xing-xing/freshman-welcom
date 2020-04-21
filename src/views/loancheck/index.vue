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
          label="贷款编号"
          prop="financialAidId"
        />
        <el-table-column
          label="学生学号"
          prop="studentId"
        />
        <el-table-column
          label="减免金额"
          prop="deduction"
        />
        <el-table-column
          label="审核状态">
          <template slot-scope="scope">
            <el-button v-if="scope.row.auditStatus ===0" type="info" size="mini"> 未 审 核 </el-button>
            <el-button v-if="scope.row.auditStatus ===1" type="danger" size="mini">审核失败</el-button>
            <el-button v-if="scope.row.auditStatus ===2" type="success" size="mini">审核成功</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.auditStatus ===0" type="primary" icon="el-icon-search" size="mini" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
            <el-button v-else type="info" icon="el-icon-search" size="mini" @click="handleEdit(scope.$index, scope.row)">重审</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="nav_table">
        <span class="common-text">共{{ total }}条，显示{{ startRow }}-{{ endRow }}条</span>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @prev-click="prePage"
          @next-click="nextPage"
          @current-change="changeCurrent"
        />
      </div>
    </div>
    <el-dialog title="贷款审核" :visible.sync="dialogFormVisible">
      <img :src="imageUrl" style="width: auto">
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkSuccess">通 过</el-button>
        <el-button type="danger" @click="checkFail">不通过</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getList } from '@/api/table'
import { mapGetters } from 'vuex'
import { postForm } from '../../api/form'
export default {
  data() {
    return {
      tableData: [],
      listLoading: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      startRow: 0,
      endRow: 10,
      dialogFormVisible: false,
      imageUrl: '',
      currentStudentId: '',
      currentDeductFee: ''
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'path',
      'globalUrl'
    ])
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList('/queryMajorFinancialAid/' + this.path + '/' + this.currentPage + '/' + this.pageSize).then(response => {
        const data = response.data
        this.tableData = data.list
        // 设置页面信息
        this.total = data.total
        this.currentPage = data.pageNum
        this.startRow = data.startRow
        this.endRow = data.endRow
        this.listLoading = false
      })
    },
    prePage() {
      this.currentPage--
    },
    nextPage() {
      this.currentPage++
    },
    changeCurrent(curPage) {
      this.currentPage = curPage
      this.fetchData()
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true
      console.log(row)
      this.currentStudentId = row.studentId
      this.currentDeductFee = row.deduction
      this.imageUrl = this.globalUrl + '/queryCheckInfo/' + row.studentId
    },
    checkSuccess() {
      // 审核成功
      const data = {
        'studentId': this.currentStudentId,
        'deductFee': this.currentDeductFee
      }
      postForm('/checkLoanSuccess', data).then(response => {
        if (response.code === 20000) {
          console.log('审核通过')
          this.dialogFormVisible = false
        }
      })
    },
    checkFail() {
      // 审核失败
      getList('/checkLoanFail/' + this.currentStudentId).then(response => {
        if (response.code === 20000) {
          console.log('审核未通过')
          this.dialogFormVisible = false
        }
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
  .nav_table{
    margin-top: 0px;
    text-align: right;
  }
  .common-text{
    margin-top: 10px;
    float: left;
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
