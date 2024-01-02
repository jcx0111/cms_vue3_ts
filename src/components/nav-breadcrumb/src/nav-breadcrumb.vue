<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="bread in breadcrumbs" :key="bread">
        <el-breadcrumb-item :to="{ path: '#' }">{{ bread.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../tpye'
export default defineComponent({
  props: {
    //面包屑数据
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less"></style>
