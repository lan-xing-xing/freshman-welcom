<template>
  <div class="container">
    <div id="myCharts" ref="myCharts" />
  </div>
</template>

<script>
import 'echarts/map/js/china.js'
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
    console.log(path)
    // 设置每隔一秒刷新一次
    const refreshTime = 1000
    // 初始化
    const myCharts = this.$echarts.init(this.$refs.myCharts)
    function myRealTimeDataAndShow() {
      getList('/getRealTimeData' + path).then(response => {
        realTimeData = response.data
        // 生源地数据
        const dataOfStudentSource = [
          {
            name: '辽宁',
            value: realTimeData.address.liaoning
          },
          {
            name: '黑龙江',
            value: realTimeData.address.heilongjiang
          },
          {
            name: '湖南',
            value: realTimeData.address.hunan
          },
          {
            name: '安徽',
            value: realTimeData.address.anhui
          },
          {
            name: '山东',
            value: realTimeData.address.shandong
          },
          {
            name: '新疆',
            value: realTimeData.address.xinjiang
          },
          {
            name: '江苏',
            value: realTimeData.address.jiangsu
          },
          {
            name: '浙江',
            value: realTimeData.address.zhejiang
          },
          {
            name: '江西',
            value: realTimeData.address.jiangxi
          },
          {
            name: '湖北',
            value: realTimeData.address.hubei
          },
          {
            name: '广西',
            value: realTimeData.address.guangxi
          },
          {
            name: '甘肃',
            value: realTimeData.address.gansu
          },
          {
            name: '山西',
            value: realTimeData.address.shanxi1
          },
          {
            name: '内蒙古',
            value: realTimeData.address.neimenggu
          },
          {
            name: '陕西',
            value: realTimeData.address.shanxi2
          },
          {
            name: '吉林',
            value: realTimeData.address.jilin
          },
          {
            name: '福建',
            value: realTimeData.address.fujian
          },
          {
            name: '贵州',
            value: realTimeData.address.guizhou
          },
          {
            name: '广东',
            value: realTimeData.address.guangdong
          },
          {
            name: '青海',
            value: realTimeData.address.qinghai
          },
          {
            name: '西藏',
            value: realTimeData.address.xizang
          },
          {
            name: '四川',
            value: realTimeData.address.sichuan
          },
          {
            name: '宁夏',
            value: realTimeData.address.ningxia
          },
          {
            name: '海南',
            value: realTimeData.address.hainan
          },
          {
            name: '河北',
            value: realTimeData.address.hebei
          },
          {
            name: '天津',
            value: realTimeData.address.tianjin
          },
          {
            name: '北京',
            value: realTimeData.address.beijing
          },
          {
            name: '重庆',
            value: realTimeData.address.chongqing
          },
          {
            name: '河南',
            value: realTimeData.address.henan
          },
          {
            name: '海南',
            value: realTimeData.address.hainan
          },
          {
            name: '台湾',
            value: realTimeData.address.taiwan
          },
          {
            name: '云南',
            value: realTimeData.address.yunnan
          }
        ]
        const yDataOfStudentSource = []
        dataOfStudentSource.sort(function(o1, o2) {
          if (isNaN(o1.value) || o1.value == null) return -1
          if (isNaN(o2.value) || o2.value == null) return 1
          return o1.value - o2.value
        })
        // 加入生源地数据来源
        for (var i = 0; i < dataOfStudentSource.length; i++) {
          yDataOfStudentSource.push(dataOfStudentSource[i].name)
        }
        myCharts.setOption({
          tooltip: {
            show: true,
            formatter: function(params) {
              return params.name + '：' + params.value
            }
          },
          visualMap: {
            type: 'continuous',
            text: ['', ''],
            showLabel: true,
            seriesIndex: [0],
            min: 0,
            max: 1000,
            inRange: {
              color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096']
            },
            textStyle: {
              color: '#000'
            },
            bottom: 30,
            left: 'left'
          },
          grid: {
            right: 10,
            top: 80,
            bottom: 30,
            width: '20%'
          },
          xAxis: {
            type: 'value',
            scale: true,
            position: 'top',
            splitNumber: 1,
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 2,
              textStyle: {
                color: '#aaa'
              }
            }
          },
          yAxis: {
            type: 'category',
            nameGap: 16,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#999'
              }
            },
            data: yDataOfStudentSource
          },
          geo: {
            roam: true,
            map: 'china',
            left: 'left',
            right: '300',
            layoutSize: '80%',
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                areaColor: '#fff464'
              }
            },
            regions: [{
              name: '南海诸岛',
              value: 0,
              itemStyle: {
                normal: {
                  opacity: 0,
                  label: {
                    show: false
                  }
                }
              }
            }]
          },
          series: [{
            name: 'mapSer',
            type: 'map',
            roam: false,
            geoIndex: 0,
            label: {
              show: false
            },
            data: dataOfStudentSource
          }, {
            name: 'barSer',
            type: 'bar',
            roam: false,
            visualMap: false,
            zlevel: 2,
            barMaxWidth: 20,
            itemStyle: {
              normal: {
                color: '#40a9ed'
              },
              emphasis: {
                color: '#3596c0'
              }
            },
            label: {
              normal: {
                show: false,
                position: 'right',
                offset: [0, 10]
              },
              emphasis: {
                show: true,
                position: 'right',
                offset: [10, 0]
              }
            },
            data: dataOfStudentSource
          }]
        })
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
  #myCharts{
    margin-top: 20px;
    width: auto;
    height: 600px;
  }
</style>
