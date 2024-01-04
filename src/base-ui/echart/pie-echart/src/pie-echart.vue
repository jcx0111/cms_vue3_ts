<template>
  <div class="base-echart">
    <div ref="refEchart" style="width: 100%; height: 300px"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const refEchart = ref<HTMLElement>()

    onMounted(() => {
      const echart = echarts.init(refEchart.value!)

      echart.setOption(props.option)
    })
    return {
      refEchart
    }
  }
})
</script>

<style scoped lang="less"></style>
