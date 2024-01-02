<template>
  <div class="user">
    <div class="search">
      <hy-form v-bind="searchFormConfig" v-model="formData">
        <template #header>
          <h2 class="header">高级检索</h2>
        </template>
        <template #footer>
          <div class="handle-btns">
            <el-button @click="formReset">重置</el-button>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </div>
        </template>
      </hy-form>
    </div>
    <div class="content">
      <hy-table
        :listData="userList"
        :propList="propList"
        :title="title"
        :showIndexColumn="showIndexColumn"
        :userCount="userCount"
      >
        <!-- header中的插槽 -->
        <template #headerHandler>
          <el-button type="primary" size="small">添加用户</el-button>
        </template>
        <!-- 列中的插槽 -->
        <template #status="scope">
          <el-button>{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
        </template>
        <template #createAt="scope">
          <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
        </template>
        <template #updateAt="scope">
          <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
        </template>
        <template #handler>
          <div class="handler-btns">
            <el-button icon="el-icon-edit" type="text">编辑</el-button>
            <el-button icon="el-icon-delete" type="text">删除</el-button>
          </div>
        </template>
      </hy-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import HyForm from '@/base-ui/form'
import HyTable from '@/base-ui/table'
import { searchFormConfig } from './config/search.config'
import { useStore } from '@/store'
// import { Search } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'user',
  components: {
    HyForm,
    HyTable
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    const formReset = () => {
      formData.value.id = ''
      formData.value.name = ''
      formData.value.password = ''
      formData.value.sport = ''
      formData.value.createTime = ''
    }
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/mock/user/list',
      qaueryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)
    const title = '用户列表'
    const propList = [
      { prop: 'name', label: '用户名', minWidth: '80' },
      { prop: 'realname', label: '真实姓名', minWidth: '90' },
      { prop: 'cellphone', label: '电话', minWidth: '130' },
      { prop: 'enable', label: '状态', minWidth: '90', slotName: 'status' },
      { prop: 'createAt', label: '创建时间', minWidth: '180', slotName: 'createAt' },
      { prop: 'updateAt', label: '修改时间', minWidth: '180', slotName: 'updateAt' },
      { label: '操作', minWidth: '180', slotName: 'handler' }
    ]

    const showIndexColumn = true

    return {
      searchFormConfig,
      formData,
      formReset,
      title,
      userList,
      userCount,
      propList,
      showIndexColumn
    }
  }
})
</script>

<style scoped lang="less">
.header {
  color: skyblue;
}
.handle-btns {
  text-align: right;
  padding: 0 20px 20px 0;
}
.content {
  padding: 20px;
  border-top: 10px solid #f5f5f5;
}
</style>
