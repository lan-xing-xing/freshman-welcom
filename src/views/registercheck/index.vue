<template>
  <div class="container">
    <el-card class="box-card">
      <div class="horizontal-box">
        <el-input
          v-model="search"
          size="middle"
          placeholder="输入关键字搜索"
        />
        <el-button style="margin-left: 20px" type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="box-item">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="学号">
            <el-input v-model="form.studentId" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.studentName" />
          </el-form-item>
          <el-form-item label="报到状态">
            <el-input v-model="form.payStatus" />
          </el-form-item>
          <el-form-item label="注册状态">
            <el-input v-model="form.registerStatus" />
          </el-form-item>
          <el-form-item label="选择宿舍">
            <el-select v-model="value" placeholder="请选择" @change="getDescription()">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <span>{{ roomDescription }}</span>
          </el-form-item>
        </el-form>
        <div class="horizontal-button">
          <el-button v-if="isPay" type="info" disabled=true>已报到</el-button>
          <el-button v-else type="primary" plain @click="postPay">报到</el-button>
          <el-button v-if="isRegister" type="info" disabled=true style="margin-left: 80px">已注册</el-button>
          <el-button v-else type="primary" plain @click="postRegister" style="margin-left: 80px">注册</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { postForm } from '../../api/form'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      search: '',
      isPay: false,
      isRegister: false,
      form: {
        studentId: '',
        studentName: '',
        payStatus: '',
        registerStatus: ''
      },
      value: '',
      options: [],
      roomDescription: '',
      isFull: false,
      roomDetails: []
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
    onSubmit() {
      console.log('submit!')
    },
    fetchData() {
      getList('/queryRoom' + this.path).then(response => {
        for (const room of response.data) {
          const roomName = room.roomName
          const roomDescription = '宿舍楼栋：' + room.dormitoryName + '|' + '最大人数:' +
            room.max + '|' + '已有人数:' + room.haveNum
          const newRoom = { 'value': roomName, 'label': roomName }
          this.options.push(newRoom)
          const roomDetail = { [roomName]: roomDescription }
          this.roomDetails.push(roomDetail)
          if (room.max <= room.haveNum) {
            this.isFull = true
          }
        }
      })
    },
    getDescription() {
      if (!this.isFull) {
        const roomDetails = this.roomDetails // roomDetails是一个数组，数组中有对象
        for (const index in roomDetails) {
          for (var key in roomDetails[index]) {
            if (key === this.value) {
              console.log(roomDetails[index])
              console.log(key)
              console.log(roomDetails[index][key])
              this.roomDescription = roomDetails[index][key]
            }
          }
        }
      } else {
        this.roomDescription = '房间已满员！！请选择其他房间'
      }
    },
    searchStudent() {
      getList(this.path + '/getStudentRegister/' + this.search).then(response => {
        const data = response.data
        this.form.studentId = data.studentId
        this.form.studentName = data.studentName
        this.form.payStatus = data.payStatus === 1 ? '已报到' : '未报到'
        this.form.registerStatus = data.registerStatus === 1 ? '已注册' : '未注册'
        this.value = data.roomName
        this.isPay = data.payStatus === 1
        this.isRegister = data.registerStatus === 1
      })
    },
    postPay() {
      getList('/updateStudentPayStatus/' + this.form.studentId).then(response => {
        if (response.code === 20000) {
          this.isPay = true
        }
      })
    },
    postRegister() {
      getList('/updateStudentRegisterStatus/' + this.form.studentId).then(response => {
        if (response.code === 20000) {
          this.isRegister = true
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
  .horizontal-button{
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
</style>
