import { Module } from 'vuex'
import router from '@/router'
import { ILoginState } from './types'
import { IRootState } from '../types'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { IAccount } from '@/service/login/types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      //建议在mutations中对state进行操作，不建议直接操作state
      // token: localCache.getCache('token') ?? '',
      // userInfo: localCache.getCache('userInfo') ?? {}
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus
      //根据userMenu中的url动态加载路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      //登录逻辑
      const accountResault = await accountLoginRequest(payload)
      const { id, token } = accountResault.data
      // console.log(accountResault.data.id, accountResault.data.token)
      localCache.setCache('token', token)
      commit('changeToken', token)
      //请求用户信息
      const userInfoResult = await requestUserInfoById(id)

      const userInfo = userInfoResult.data
      localCache.setCache('userInfo', userInfo)
      commit('changeUserInfo', userInfo)
      //请求用户菜单
      const userMenuResult = await requestUserMenusByRoleId(userInfo.role.id)
      // console.log(userMenuResult)

      const userMenus = userMenuResult.data
      localCache.setCache('userMenus', userMenus)
      commit('changeUserMenus', userMenus)

      //路由跳转
      router.push('/main')
    },
    //初始化store，防止刷新Vuex数据丢失
    loadLocalData({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
    // phoneLoginAction({ commit }, payload) {
    //   console.log('登录手机号处理逻辑', payload)
    // }
  }
}
export default loginModule
