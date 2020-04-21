<template>
  <div class="container">
    <div class="myChart">
      <div class="chart">
        <div id="reportRate" ref="reportRate"/>
      </div>
      <div class="chart">
        <div id="registerRate" ref="registerRate"/>
      </div>
    </div>
  </div>
</template>

<script>
import 'echarts-liquidfill'
import { getList } from '../../api/table'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'path'
    ]),
    // eslint-disable-next-line vue/return-in-computed-property
    path() {
      let path
      if (this.$store.getters.path.search('/') !== -1) {
        path = this.$store.getters.path
      } else if (this.$store.getters.path.search('0') !== -1) {
        path = '/school'
      } else {
        path = '/' + this.$store.getters.path
      }
      return path
    }
  },
  mounted() {
    let realTimeData
    const path = this.path
    // 设置每隔一秒刷新一次
    const refreshTime = 1000
    // 初始化
    const reportRate = this.$echarts.init(this.$refs.reportRate)
    const registerRate = this.$echarts.init(this.$refs.registerRate)
    let valueOfReportRate = 0.00
    let valueOfRegisterRate = 0.00
    let valueOfReportNum = 0
    let valueOfRegisterNum = 0
    let totalNum = 0
    // 报到率多层波浪展示
    const dataOfReportRate = [valueOfReportRate, valueOfReportRate * 0.8, valueOfReportRate * 0.6, valueOfReportRate * 0.4]
    // 注册率多层波浪展示
    const dataOfRegisterRate = [valueOfRegisterRate, valueOfRegisterRate * 0.8, valueOfRegisterRate * 0.6, valueOfRegisterRate * 0.4]
    // 报到率选项
    let reportOptions = {
      series: [{
        type: 'liquidFill',
        radius: '50%',
        data: dataOfReportRate,
        color: 'rgba(67,209,100,1)',
        label: {
          normal: {
            color: '#fff',
            formatter: function() {
              return '新生报到率' + '\n' + (valueOfReportRate * 100).toFixed(2) + '%'
            },
            insideColor: 'transparent',
            textStyle: {
              fontSize: 16,
              fontWeight: 'bold',
              fontFamily: 'Microsoft YaHei'
            }
          }
        },
        outline: {
          show: true,
          borderDistance: 5,
          itemStyle: {
            borderColor: 'rgba(67,209,100,1)',
            borderWidth: 2
          }
        },
        backgroundStyle: {
          color: 'rgba(67,209,100,.3)'
        }
      }]
    }
    // 注册率选项
    let registerOptions = {
      series: [{
        type: 'liquidFill',
        radius: '50%',
        data: dataOfRegisterRate,
        color: 'rgb(109,209,185)',
        label: {
          normal: {
            color: '#fff',
            formatter: function() {
              return '新生注册率' + '\n' + (valueOfRegisterRate * 100).toFixed(2) + '%'
            },
            insideColor: 'transparent',
            textStyle: {
              fontSize: 16,
              fontWeight: 'bold',
              fontFamily: 'Microsoft YaHei'
            }
          }
        },
        outline: {
          show: true,
          borderDistance: 5,
          itemStyle: {
            borderColor: 'rgba(109,209,185)',
            borderWidth: 2
          }
        },
        backgroundStyle: {
          color: 'rgba(109,209,185,.3)'
        }
      }]
    }
    // 实时更新数据
    function myRealTimeDataAndShow() {
      getList('/getRealTimeData' + path).then(response => {
        realTimeData = response.data
        // 报到率和注册率
        valueOfReportRate = realTimeData.payRate
        valueOfRegisterRate = realTimeData.registerRate
        valueOfReportNum = realTimeData.payNum
        valueOfRegisterNum = realTimeData.registerNum
        totalNum = realTimeData.totalNum
        // 报到率选项
        reportOptions = {
          series: [{
            type: 'liquidFill',
            radius: '70%',
            data: dataOfReportRate,
            color: 'rgba(67,209,100,1)',
            label: {
              normal: {
                color: '#fff',
                formatter: function() {
                  return '总人数： ' + totalNum + '\n' +
                    '报到人数: ' + valueOfReportNum + '\n' +
                    '报到率: ' + (valueOfReportRate * 100).toFixed(2) + '%'
                },
                insideColor: 'transparent',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'Microsoft YaHei'
                }
              }
            },
            outline: {
              show: true,
              borderDistance: 5,
              itemStyle: {
                borderColor: 'rgba(67,209,100,1)',
                borderWidth: 2
              }
            },
            backgroundStyle: {
              color: 'rgba(67,209,100,.3)'
            }
          }]
        }
        registerOptions = {
          series: [{
            type: 'liquidFill',
            radius: '70%',
            data: dataOfRegisterRate,
            color: 'rgb(109,209,185)',
            label: {
              normal: {
                color: '#fff',
                formatter: function() {
                  return '总人数： ' + totalNum + '\n' +
                    '注册人数: ' + valueOfRegisterNum + '\n' +
                    '注册率: ' + (valueOfRegisterRate * 100).toFixed(2) + '%'
                },
                insideColor: 'transparent',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'Microsoft YaHei'
                }
              }
            },
            outline: {
              show: true,
              borderDistance: 5,
              itemStyle: {
                borderColor: 'rgba(109,209,185)',
                borderWidth: 2
              }
            },
            backgroundStyle: {
              color: 'rgba(109,209,185,.3)'
            }
          }]
        }
        reportRate.setOption(reportOptions)
        registerRate.setOption(registerOptions)
      })
    }
    this.timer = setInterval(myRealTimeDataAndShow, refreshTime)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style>
.myChart{
  display: flex;
  justify-content: space-around;
}
.chart{
  width: 50%;
  height: auto;
  text-align: center;
}
#reportRate{
  margin-top: 40px;
  width: 100%;
  height: 400px;
}
#registerRate{
  margin-top: 40px;
  width: 100%;
  height: 400px;
}
.text{
  font-size: large;
  font-weight: bold;
}
</style>
