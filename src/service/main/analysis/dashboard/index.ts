import hyRequest from '@/service'
import { IDataType } from '@/service/login/types'

enum DashboardAPI {
  categoryGoodsCount = '/mock/goods/category/count',
  categoryGoodsSale = '/mock/goods/category/sale',
  categoryGoodsFavor = '/mock/goods/category/favor',
  goodsAddressSale = '/mock/goods/address/sale'
}

export function goodsCountRequest() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function goodsSaleRequest() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  })
}

// export function goodsFavorRequest() {
//   return hyRequest.get<IDataType>({
//     url: DashboardAPI.categoryGoodsFavor
//   })
// }

// export function goodsAddressRequest() {
//   return hyRequest.get<IDataType>({
//     url: DashboardAPI.goodsAddressSale
//   })
// }
