<template>
  <el-form
    label-width="70px"
    label-position="left"
    :rules="rules"
    :model="phone"
    ref="phoneFormRef"
  >
    <el-form-item label="手机号" prop="num">
      <el-input v-model="phone.num" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code" />
        <el-button type="primary" class="code-btn" size="small">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/phone-config'
import { ElForm } from 'element-plus'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })
    const phoneFormRef = ref<InstanceType<typeof ElForm>>()
    const store = useStore()
    const phoneLogin = () => {
      phoneFormRef.value?.validate((valid) => {
        if (valid) {
          // console.log('手机号登录')
          store.dispatch('login/phoneLoginAction', { ...phone })
        }
      })
    }
    return {
      phone,
      rules,
      phoneLogin,
      phoneFormRef
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  .code-btn {
    margin-left: 7px;
  }
}
</style>
