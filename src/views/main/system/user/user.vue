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
          <el-button
            type="primary"
            size="small"
            v-if="btnPermission.includes('system:user:create')"
            @click="dialogVisible"
            >添加用户</el-button
          >
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
        <template #handler="scope">
          <div class="handler-btns">
            <el-button icon="el-icon-edit" type="text">编辑</el-button>
            <el-button
              icon="el-icon-delete"
              type="text"
              v-if="btnPermission.includes('system:user:delete')"
              @click="btnDeleteHandler(scope.row)"
              >删除</el-button
            >
          </div>
        </template>
      </hy-table>
      <Dialog ref="dialogRef" @addUser="addNewUser"></Dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import HyForm from '@/base-ui/form'
import HyTable from '@/base-ui/table'
import Dialog from '@/base-ui/dialog'
import { searchFormConfig } from './config/search.config'
import { useStore } from '@/store'

// import { Search } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'user',
  components: {
    HyForm,
    HyTable,
    Dialog
  },
  // directives: {
  //   permission: {
  //     mounted(el: HTMLElement, binding) {
  //       console.log(this)
  //     }
  //   }
  // },
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
    function getUserList(row?: any, newUser?: any) {
      store.dispatch('system/getPageListAction', {
        pageUrl: '/mock/user/list',
        queryInfo: {
          offset: 0,
          size: 10,
          row,
          newUser
        }
      })
    }
    const store = useStore()
    const btnPermission = store.state.login.btnPermission
    getUserList()
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
    // 展示table序号
    const showIndexColumn = true
    //添加用户
    const dialogRef = ref<InstanceType<typeof Dialog>>()
    const dialogVisible = () => {
      if (dialogRef.value) {
        dialogRef.value.dialogFormVisible = true
      }
    }
    const addNewUser = (newUser: any) => {
      // console.log('user:', option)
      getUserList(undefined, newUser)
    }
    // 删除用户
    const btnDeleteHandler = (row: any) => {
      getUserList(row)
    }

    return {
      searchFormConfig,
      formData,
      formReset,
      title,
      btnPermission,
      userList,
      userCount,
      propList,
      showIndexColumn,
      dialogRef,
      dialogVisible,
      addNewUser,
      btnDeleteHandler
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
