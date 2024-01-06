<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>分类商品数量(饼图)</span>
            </div>
          </template>
          <pie-echart :option="goodsCountOption"></pie-echart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>分类商品销量</span>
            </div>
          </template>
          <bar-echart></bar-echart></el-card
      ></el-col>
    </el-row>
    <!-- <el-row :gutter="20" class="content">
      <el-col :span="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>不同城市商品销量</span>
            </div>
          </template>
        </el-card></el-col
      >
      <el-col :span="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>分类商品收藏</span>
            </div>
          </template>
        </el-card></el-col
      >
    </el-row> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import PieEchart from '../../../../base-ui/echart/pie-echart'
import BarEchart from '../../../../base-ui/echart/bar-echart/bar-echart.vue'

export default defineComponent({
  name: 'dashboard',
  components: {
    BarEchart,
    PieEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    const goodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item) => {
        return { value: item.goodsCount, name: item.name }
      })
    })

    const goodsCountOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        left: 'center'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: goodsCount.value,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    return {
      goodsCountOption
    }
  }
})
</script>

<style scoped lang="less">
.content {
  margin-top: 20px;
}
</style>
