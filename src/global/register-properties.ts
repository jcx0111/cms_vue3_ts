import { App } from 'vue'
import { formatUtcString } from '@/utils/format-time'

export default function registerProperties(app: App) {
  //定义全局属性，在任何地方都能使用
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
