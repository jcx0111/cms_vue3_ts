import { Module } from 'vuex'
import { IDashboardState } from './types'
import { IRootState } from '@/store/types'
import {
  goodsCountRequest,
  // goodsAddressRequest,
  // goodsFavorRequest,
  goodsSaleRequest
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      // categoryGoodsFavor: [],
      categoryGoodsSale: []
      // goodsAddressSale: []
    }
  },
  mutations: {
    changeGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    // changeGoodsFavor(state, list) {
    //   state.categoryGoodsFavor = list
    // },
    changeGoodsSale(state, list) {
      state.categoryGoodsSale = list
    }
    // changeGoodsAddress(state, list) {
    //   state.goodsAddressSale = list
    // }
  },
  actions: {
    // 发送请求，获取数据
    async getDashboardDataAction({ commit }) {
      const goodsCountResult = await goodsCountRequest()
      // const goodsFavorResult = await goodsFavorRequest()
      const goodsSaleResult = await goodsSaleRequest()
      // const addressSaleResult = await goodsAddressRequest()

      commit('changeGoodsCount', goodsCountResult.data)

      // commit('changeGoodsFavor', goodsFavorResult.data)

      commit('changeGoodsSale', goodsSaleResult.data)

      // commit('changeGoodsAddress', addressSaleResult.data)

      console.log('发送')
    }
  }
}

export default dashboardModule
