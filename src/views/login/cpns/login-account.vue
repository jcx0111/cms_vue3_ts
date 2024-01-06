<template>
  <el-form
    label-width="60px"
    label-position="left"
    :rules="rules"
    :model="account"
    ref="accountFormRef"
  >
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password />
    </el-form-item>
    <div class="password-control">
      <el-checkbox v-model="isKeepPassWord">记住密码</el-checkbox>
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import localCache from '@/utils/cache'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const isKeepPassWord = ref(true)
    const accountFormRef = ref<InstanceType<typeof ElForm>>()

    const accountLogin = () => {
      //validate验证通过返回true
      accountFormRef.value?.validate((valid) => {
        if (valid) {
          //是否记住密码
          if (isKeepPassWord.value) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          //进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    return {
      account,
      rules,
      isKeepPassWord,
      accountLogin,
      accountFormRef
    }
  }
})
</script>

<style scoped>
.password-control {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
