<template>
  <div class="nav-header">
    <el-icon :size="30" v-if="!isFold" @click="changeFold"><Fold /></el-icon>
    <el-icon :size="30" v-if="isFold" @click="changeFold"><Expand /></el-icon>
    <div class="content">
      <div>
        <nav-breadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <div class="user-info">
        <el-dropdown>
          <span>
            <el-icon><User /></el-icon>
            <span>{{ name }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import NavBreadcrumb from '../../nav-breadcrumb'
import { pathMapToBreadcrumbs } from '@/utils/map-menus'
import { Fold, Expand, User } from '@element-plus/icons-vue'
import emitter from '@/bus'
export default defineComponent({
  components: {
    Fold,
    Expand,
    User,
    NavBreadcrumb
  },
  setup() {
    const isFold = ref(false)
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)
    const changeFold = () => {
      isFold.value = !isFold.value
      emitter.emit('changeCollapse', isFold.value)
    }
    //面包屑数据

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapToBreadcrumbs(userMenus, currentPath)
    })
    // console.log(breadcrumbs)

    return {
      isFold,
      name,
      changeFold,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
    .user-info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
