//Vue内部定义的app类型
import { App } from 'vue'

import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElTable,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElAside,
  ElMain,
  ElHeader,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElRadioGroup,
  ElRadioButton,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElRow,
  ElCol,
  ElDatePicker,
  ElOption,
  ElSelect,
  ElContainer,
  ElCheckbox,
  ElLink,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTableColumn,
  ElPagination,
  ElCard
} from 'element-plus'

import 'element-plus/lib/theme-chalk/index.css'
const components = [
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElContainer,
  ElAside,
  ElMain,
  ElHeader,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElRadioGroup,
  ElRadioButton,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElRow,
  ElCol,
  ElDatePicker,
  ElOption,
  ElSelect,
  ElCheckbox,
  ElLink,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElPagination,
  ElCard
]
//全局注册element-plus组件
export default function register(app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
