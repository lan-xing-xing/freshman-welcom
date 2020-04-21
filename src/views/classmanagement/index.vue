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
          label="班主任"
          prop="headteacherName"
        />
        <el-table-column
          label="学生总数"
          prop="studentNum"
        />
        <el-table-column
          label="激活人数"
          prop="haveInfo"
        />
        <el-table-column
          label="报到人数"
          prop="havePay"
        />
        <el-table-column
          label="注册人数"
          prop="haveRegister"
        />
      </el-table>
    </div>
  </el-card>
</template>

<script>
import { getList } from '@/api/table'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tableData: [],
      listLoading: ''
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
      getList('/queryClassInfo' + this.path).then(response => {
        this.tableData = response.data
        this.listLoading = false
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
