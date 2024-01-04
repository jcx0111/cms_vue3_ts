import { Store, createStore, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'why',
      age: 18
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

//初始化store，解决store刷新数据丢失
export function setupStore() {
  store.dispatch('login/loadLocalData')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
