<template>
  <div ref="pieRef" style="width: 100%; height: 300px"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useStore } from '../../../store'

import * as echarts from 'echarts'
export default defineComponent({
  setup() {
    const pieRef = ref<HTMLElement>()
    const store = useStore()
    onMounted(() => {
      const echart = echarts.init(pieRef.value!)

      const goodsSale = computed(() => {
        return store.state.dashboard.categoryGoodsSale
      })
      console.log(goodsSale.value)

      const data = goodsSale.value.map((item) => {
        return { name: item.name, value: item.goodsCount }
      })

      // 底部立体柱子
      let bottomBar = data.map((item) => {
        return {
          value: item.value,
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              type: 'linear',
              global: false,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(23, 131, 246,.7)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(8, 97, 131,.7)'
                },
                {
                  offset: 0.99,
                  color: 'rgba(3, 57, 110,.7)'
                },
                {
                  offset: 1,
                  color: 'rgba(3, 57, 110,0)'
                }
              ]
            }
          }
        }
      })
      // 中间圆片
      let middleCircle = data.map((item) => {
        return {
          name: '',
          value: item.value,
          symbolPosition: 'end',
          symbolSize: item.value === 0 ? 0 : [40, 8], // 当数值为0时，消失
          itemStyle: {
            color: 'rgba(83, 232, 240)'
          }
        }
      })

      const goodsSaleOption = {
        backgroundColor: 'rgba(0, 55, 107)',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          backgroundColor: 'rgba(1, 65, 122,0.5)',
          borderWidth: 0,
          padding: 5,
          textStyle: {
            color: 'rgba(255,255,255)',
            fontSize: 18
          },
          formatter: function (item: any) {
            return `<div style="position: relative;padding-left:20px"><div style="position: absolute;left:3px;top:50%;transform: translateY(-50%);width:2px;height:33px;background-color:rgba(28, 205, 255)"></div>${item[0].name} </br> 销量:  ${item[0].value}  </div>`
          }
        },
        grid: {
          bottom: '10%',
          top: '20%',
          right: '10%',
          left: '10%',
          containLabel: false, // 让图表内容完全显示，并且在 4 边留下边距。
          axisPointer: {
            shadowStyle: {
              color: 'rgba(135, 206, 235, 0.5)'
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true, //两侧留白
          axisLine: {
            lineStyle: {
              color: 'rgba(2, 119, 175)',
              width: 2,
              type: 'solid'
            },
            show: true,
            onZero: false // 将 x 轴坐标轴置于最低刻度上
          },
          axisPointer: {
            show: true, // 显示坐标轴指示器
            type: 'none', // shadow设置为阴影类型
            snap: true,
            label: {
              show: false // 不显示文本标签
            },
            shadowStyle: {
              color: 'rgba(12, 116, 166,.5)' // 设置阴影颜色
            }
          },
          axisLabel: {
            interval: 0,
            color: 'rgba(255,255,255)', //更改坐标轴文字颜色
            fontSize: 12, //更改坐标轴文字大小
            margin: 20
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              color: 'rgba(2, 119, 175)', // 刻度线颜色
              width: 2 // 刻度线宽度
            },
            length: 6 // 刻度线的长度
          },
          data: data.map((v) => v.name)
        },
        yAxis: {
          // name: '温度',
          type: 'value',
          min: '0',
          // max: 100,
          splitLine: {
            interval: 0,
            show: true, // 开启分割线
            lineStyle: {
              color: 'rgba(6, 88, 142)',
              width: 2,
              type: [6, 3]
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'rgba(207, 219, 230)'
          }
        },
        series: [
          //底部立体柱
          {
            z: 30,
            stack: '1',
            type: 'bar',
            silent: true,
            barWidth: 40,
            data: bottomBar,
            label: {
              show: true, // 显示标签
              position: 'top', // 标签位置
              color: 'rgba(255, 255, 255)', // 标签颜色

              fontStyle: 'normal', // 字体风格
              fontWeight: 'normal', // 字体粗细
              fontFamily: 'sans-serif', // 字体系列
              fontSize: 12, // 字体大小
              lineHeight: 24 // 行高
            },

            emphasis: {
              itemStyle: {
                // 普通图表的高亮颜色
                // color: 'rgba(38, 207, 254)',
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: 'linear',
                  global: false,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(38, 207, 254,.7)'
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(18, 151, 173,.7)'
                    },
                    {
                      offset: 0.99,
                      color: 'rgba(3, 57, 110,.7)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(3, 57, 110,0)'
                    }
                  ]
                },
                borderWidth: 1,
                borderColor: 'rgba(70, 215, 255)'
              }
            },

            itemStyle: {
              color: '#000'
            }
          },
          // 中间圆片
          {
            name: '',
            z: 100,
            type: 'pictorialBar',
            symbolSize: [40, 10],
            symbolOffset: [0, -5],
            data: middleCircle
          }
        ]
      }

      echart.setOption(goodsSaleOption)
    })
    return {
      pieRef
    }
  }
})
</script>

<style scoped lang="less"></style>
