<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><strong>学生信息列表</strong></span>
      <div class="customer_search">
        <el-button class="my_button" type="info" plain icon="el-icon-search" @click="showsearch">高级搜索</el-button>
        <el-button class="my_button" type="success" style="margin-left: 14px" plain>
          <a :href="'http://120.79.131.49:8089/exportStudentDetails' + this.exportpath">
            导出<i class="el-icon-upload2" /></a>
        </el-button>
        <div class="upload_content" v-if="this.exportpath === '/school'">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" type="info" plain icon="el-icon-search">选取文件</el-button>
            <el-button style="margin-left: 14px;" type="success" plain @click="submitUpload">导入<i class="el-icon-download" /></el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过500kb</div>
          </el-upload>
        </div>
      </div>
    </div>
    <div v-if="haveSearch" class="customer_search">
      <el-card class="box-card">
        <span>请根据以下任意条件进行搜索：</span><br><br><br>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" label="right">
          <el-form-item label="学号:">
            <el-input v-model="formInline.studentId" placeholder="请输入学号" />
          </el-form-item>&nbsp;&nbsp;&nbsp;
          <el-form-item label="准考证号:">
            <el-input v-model="formInline.examId" placeholder="请输入准考证号" />
          </el-form-item>&nbsp;&nbsp;&nbsp;
          <el-form-item label="姓名:">
            <el-input v-model="formInline.name" placeholder="请输入姓名" />
          </el-form-item>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-form-item label="激活状态:">
            <el-select v-model="formInline.infoStatus" clearable placeholder="请选择激活状态">
              <el-option label="已激活" value="1" />
              <el-option label="未激活" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="报到状态:">
            <el-select v-model="formInline.payStatus" clearable placeholder="请选择报到状态">
              <el-option label="已报到" value="1" />
              <el-option label="未报到" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="注册状态:">
            <el-select v-model="formInline.registerStatus" clearable placeholder="请选择注册状态">
              <el-option label="已注册" value="1" />
              <el-option label="未注册" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="info_table">
      <el-table
        v-loading="listloading"
        :data="tabledata"
        stripe
        style="width: 100%"
      >
        <el-table-column
          label="学号"
          prop="studentId"
        />
        <el-table-column
          label="准考证号"
          prop="examId"
        />
        <el-table-column
          label="姓名"
          prop="studentName"
        />
        <el-table-column
          label="性别"
          prop="gender"
        />
        <el-table-column
          label="学院"
          prop="collegeName"
        />
        <el-table-column
          label="专业"
          prop="majorName"
        />
        <el-table-column
          label="班级"
          prop="className"
        />
        <el-table-column
          label="生源地"
          prop="cradle"
        />
        <el-table-column
          label="身份证号"
          prop="idNumber"
        />
        <el-table-column label="激活状态">
          <template slot-scope="scope">
            <el-button v-if="scope.row.infoStatus" type="success" size="mini">已激活</el-button>
            <el-button v-else type="info" size="mini">未激活</el-button>
          </template>
        </el-table-column>
        <el-table-column label="报到状态">
          <template slot-scope="scope">
            <el-button v-if="scope.row.payStatus" type="success" size="mini">已报到</el-button>
            <el-button v-else type="info" size="mini">未报到</el-button>
          </template>
        </el-table-column>
        <el-table-column label="注册状态">
          <template slot-scope="scope">
            <el-button v-if="scope.row.registerStatus" type="success" size="mini">已注册</el-button>
            <el-button v-else type="info" size="mini">未注册</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-search" size="mini" @click="handleBrowse(scope.$index, scope.row)">查看</el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="nav_table">
        <span class="common-text">共{{ total }}条，显示{{ startrow }}-{{ endrow }}条</span>
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
    <el-dialog
      title="学生详细信息"
      :visible.sync="dialogTableVisible"
    >
      <el-table :data="detailsTable">
        <el-table-column prop="studentId" label="学号" />
        <el-table-column prop="examId" label="准考证号" />
        <el-table-column prop="studentName" label="姓名" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="idNumber" label="身份证号" />
        <el-table-column prop="phone" label="手机号码" />
      </el-table>
      <el-table :data="detailsTable">
        <el-table-column prop="mail" label="邮箱" />
        <el-table-column prop="address" label="家庭住址" />
        <el-table-column prop="collegeName" label="学院" />
        <el-table-column prop="majorName" label="专业" />
        <el-table-column prop="className" label="班级" />
        <el-table-column prop="headteacherName" label="班主任" />
      </el-table>
      <el-table :data="detailsTable">
        <el-table-column prop="dormitoryName" label="宿舍楼栋" />
        <el-table-column prop="roomName" label="宿舍号" />
        <el-table-column prop="date" label="预计到达时间" />
        <el-table-column prop="transportation" label="交通工具" />
        <el-table-column prop="payStatus" label="报到状态" />
        <el-table-column prop="registerStatus" label="注册状态" />
      </el-table>
      <el-table :data="detailsTable">
        <el-table-column prop="fatherName" label="父亲姓名" />
        <el-table-column prop="fatherPhone" label="父亲电话" />
        <el-table-column prop="motherName" label="母亲姓名" />
        <el-table-column prop="motherPhone" label="母亲电话" />
        <el-table-column prop="emergencyContactName" label="紧急联系人姓名" />
        <el-table-column prop="emergencyContactPhone" label="紧急联系人电话" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改学生信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="right">
        <el-form-item label="姓名" label-width="80px">
          <el-input v-model="form.studentName" autocomplete="off" :disabled="true"/>
        </el-form-item>
        <el-form-item label="学号" label-width="80px">
          <el-input v-model="form.studentId" autocomplete="off" :disabled="true"/>
        </el-form-item>
        <el-form-item label="报到状态" label-width="80px">
          <el-select v-model="form.report" placeholder="请选择报到状态">
            <el-option label="已报到" value="isReport" />
            <el-option label="未报到" value="notReport" />
          </el-select>
        </el-form-item>
        <el-form-item label="注册状态" label-width="80px">
          <el-select v-model="form.register" placeholder="请选择注册状态">
            <el-option label="已注册" value="isRegister" />
            <el-option label="未注册" value="notRegister" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getList } from '@/api/table'
import { postForm } from '../../api/form'

export default {
  name: 'CommonTable',
  props: {
    tabledata: {
      Array,
      default() {
        return []
      }
    },
    listloading: {
      default: true
    },
    total: {
      default: 0
    },
    startrow: {
      default: 1
    },
    endrow: {
      default: 0
    },
    exportpath: {
      default: null
    }
  },
  data() {
    return {
      haveSearch: false,
      fileList: [],
      formInline: {
        studentId: '',
        examId: '',
        name: '',
        infoStatus: '',
        payStatus: '',
        registerStatus: ''
      },
      detailsTable: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        studentName: '',
        studentId: '',
        report: '',
        register: ''
      }
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
      this.dialogFormVisible = true
      getList('/getDatils/' + row.studentId).then(response => {
        this.form = response.data
      })
    },
    handleBrowse(index, row) {
      this.dialogTableVisible = true
      console.log(row.studentId)
      getList('/getDatils/' + row.studentId).then(response => {
        const data = response.data
        this.detailsTable.splice(0, 1, data)
      })
    },
    prePage() {
      this.$emit('prePage')
    },
    nextPage() {
      this.$emit('nextPage')
    },
    changeCurrent(curPage) {
      this.$emit('changeCurrent', curPage)
    },
    showsearch() {
      this.haveSearch = !this.haveSearch
    },
    onSubmit() {
      if (this.formInline.studentId !== '') {
        const searchName = 'student_id'
        const searchContent = this.formInline.studentId
        this.$emit('specialSearch', searchName, searchContent)
      } else if (this.formInline.examId !== '') {
        const searchName = 'exam_id'
        const searchContent = this.formInline.examId
        this.$emit('specialSearch', searchName, searchContent)
      } else if (this.formInline.name !== '') {
        const searchName = 'student_name'
        const searchContent = this.formInline.name
        this.$emit('specialSearch', searchName, searchContent)
      } else if (this.formInline.infoStatus !== '') {
        const searchName = 'info_status'
        const searchContent = this.formInline.infoStatus
        this.$emit('specialSearch', searchName, searchContent)
      } else if (this.formInline.payStatus !== '') {
        const searchName = 'pay_status'
        const searchContent = this.formInline.payStatus
        this.$emit('specialSearch', searchName, searchContent)
      } else if (this.formInline.registerStatus !== '') {
        const searchName = 'register_status'
        const searchContent = this.formInline.registerStatus
        this.$emit('specialSearch', searchName, searchContent)
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    submitUpload() {
      console.log('上传')
      console.log(this.fileList)
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeUpload(file) {
      console.log('before')
      console.log(file)
      const formData = new FormData()
      // 向 formData 对象中添加文件
      formData.append('file', file)
      postForm('/import/student', formData).then(response => {
        if (response.code === 20000) {
          console.log('success')
        }
      })
    }
  }
}
</script>
<style>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
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
  .el-button+.el-button {
    margin-left: 0px;
  }
  .customer_search{
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
  }
  .my_button{
    height: 40px;
    margin-top: 20px;
  }
  .upload_content{
    margin-top: 20px;
    margin-left: 14px;
  }
  .el-dialog {
    width: 60%!important;
  }
  element.style {
    margin-top: 0!important;
  }
  .el-dialog__wrapper {
    top: -60px!important;
  }
</style>
