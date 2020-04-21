<template>
  <common-table
    :tabledata="tableData"
    :listloading="listLoading"
    :total="total"
    :startrow="startRow"
    :endrow="endRow"
    :exportpath=this.exportPath
    @prePage="prePage"
    @nextPage="nextPage"
    @changeCurrent="changeCurrent"
    @specialSearch="specialSearch"
  />
</template>

<script>
import { getList } from '@/api/table'
import CommonTable from '@/components/Table'
export default {
  components: {
    CommonTable
  },
  data() {
    return {
      tableData: [],
      list: null,
      listLoading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      startRow: 0,
      endRow: 10
    }
  },
  computed: {
    path() {
      let path = this.$store.getters.path
      if (path.length === 1) {
        path = this.$route.name
      }
      return path
    },
    exportPath() {
      const exportPath = '/notReport' + this.path
      return exportPath
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // 获取各个专业全部学生基本信息
      getList(this.path + '/queryStudentBasicByInfo/pay_status/0/' + this.currentPage + '/' + this.pageSize).then(response => {
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
    specialSearch(searchName, searchContent) {
      this.listLoading = true
      getList('/queryStudentByInfo/' + searchName + '/' + searchContent + '/' + this.currentPage + '/' + this.pageSize).then(response => {
        const data = response.data
        this.tableData = data.list
        // 设置页面信息
        this.total = data.total
        this.currentPage = data.pageNum
        this.startRow = data.startRow
        this.endRow = data.endRow
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
