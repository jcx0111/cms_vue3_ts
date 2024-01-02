import { Store } from 'vuex'

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {
    count: number
    name: string
  }

  type Filter = {
    formatTime<T>(str: T): any
  }
  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
    $filters: Filter
  }
}
