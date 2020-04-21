<template>
  <div class="container">
    <el-card class="box-card">
      <div class="horizontal-box">
        <el-input
          v-model="search"
          size="middle"
          placeholder="输入关键字搜索"/>
        <el-button style="margin-left: 20px" type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="box-item">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="学号" disabled="true">
            <el-input v-model="form.studentId"/>
          </el-form-item>
          <el-form-item label="姓名" disabled="true">
            <el-input v-model="form.studentName"/>
          </el-form-item>
          <el-form-item label="应缴费用" disabled="true">
            <el-input v-model="form.shouldPay"/>
          </el-form-item>
          <el-form-item label="已缴费用">
            <el-input v-model="form.hasPay"/>
          </el-form-item>
        </el-form>
        <el-button v-if="isPay" class="right-button" type="info" plain @click="postPay">重新提交</el-button>
        <el-button v-else class="right-button" type="primary" plain @click="postPay">确认缴费</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { mapGetters } from 'vuex'
import { postForm } from '../../api/form'
export default {
  data() {
    return {
      search: '',
      isPay: false,
      form: {
        studentId: '',
        studentName: '',
        shouldPay: '',
        hasPay: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'path'
    ])
  },
  methods: {
    searchStudent() {
      getList('/getStudentPayStatusByInfo/' + this.path + '/' + this.search).then(response => {
        const data = response.data
        console.log(data)
        this.form.studentId = data.studentId
        this.form.studentName = data.studentName
        this.form.shouldPay = data.tuitionFee + data.accommodationFee - data.deductFee
        this.form.hasPay = data.payTuitionFee + data.payAccommodationFee
        if (this.form.hasPay > 0) {
          this.isPay = true
        } else {
          this.isPay = false
        }
        console.log(this.isPay)
      })
    },
    postPay() {
      const data = {
        'studentId': this.form.studentId,
        'payFee': this.form.hasPay === null ? 0 : this.form.hasPay
      }
      postForm('/postStudentPay', data).then(response => {
        if (response.code === 20000) {
          this.isPay = true
          console.log(this.isPay)
        }
      })
    }
  }
}
</script>

<style scoped>
  .box-card {
    width: 50%;
    max-width: 100%;
    margin: 20px auto;
  }
  .box-item{
    margin-top: 30px;
  }
  .horizontal-box{
    display: flex;
    justify-content: center;
  }
  .right-button{
    float: right;
    margin-bottom: 30px;
  }
</style>
