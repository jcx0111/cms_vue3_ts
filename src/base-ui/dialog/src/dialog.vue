<template>
  <div class="dialog">
    <el-dialog v-model="dialogFormVisible" title="添加用户" width="400px">
      <el-form :model="formData">
        <el-form-item label="用户ID" prop="id">
          <el-input v-model="formData.id" />
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="formData.realname" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formData.cellphone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="btnHandler"> 添加 </el-button>
        </span>
      </template></el-dialog
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { getUtcTime } from '@/utils/format-time'
export default defineComponent({
  emits: ['addUser'],
  setup(prop, { emit }) {
    const dialogFormVisible = ref(false)

    const formData = reactive({
      id: '',
      name: '',
      realname: '',
      cellphone: ''
    })

    const btnHandler = () => {
      dialogFormVisible.value = false
      const time = {
        createAt: getUtcTime(),
        updateAtAt: getUtcTime()
      }
      const newUser = Object.assign(formData, time)
      emit('addUser', newUser)
    }
    return {
      dialogFormVisible,
      formData,
      btnHandler
    }
  }
})
</script>

<style scoped lang="less"></style>
