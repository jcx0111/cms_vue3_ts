import hyRequest from '@/service'
import { IDataType } from '@/service/login/types'

export function pageListRequest(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo,
    showLoading: false
  })
}
