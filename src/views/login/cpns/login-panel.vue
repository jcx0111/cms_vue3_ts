<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" v-model="activeTag" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { User, Iphone } from '@element-plus/icons-vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    User,
    Iphone,
    LoginPhone,
    LoginAccount
  },
  setup() {
    const activeTag = ref('account')
    //获取组件类型，Vue官网标注写法
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    const handleLoginClick = () => {
      //点击立即登录按钮，获取到登录子组件，调用其方法实现具体的登录业务
      //判断是账号登录还是手机登录
      if (activeTag.value === 'account') {
        //accountRef有可能是undefined，需要使用可选链写法 ?.
        accountRef.value?.accountLogin()
      } else {
        phoneRef.value?.phoneLogin()
      }
    }
    return {
      handleLoginClick,
      accountRef,
      phoneRef,
      activeTag
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 200px;
  width: 320px;
  .title {
    text-align: center;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
