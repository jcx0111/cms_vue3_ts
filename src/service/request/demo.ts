// axios具体封装
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { HYRequestConfig } from './types'
// 自定义类
class HYRequest {
  instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    // 所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('请求拦截成功')
        return config
      },
      (err) => {
        console.log('请求拦截失')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('响应拦截成功')
        return res.data
      },
      (err) => {
        console.log('请求拦截失败')
        return err
      }
    )
  }

  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }

  // get<T>(config: HYRequestConfig<T>): Promise<T> {
  //   return this.request<T>({ ...config, method: 'GET' })
  // }

  // post<T>(config: HYRequestConfig<T>): Promise<T> {
  //   return this.request<T>({ ...config, method: 'POST' })
  // }

  // delete<T>(config: HYRequestConfig<T>): Promise<T> {
  //   return this.request<T>({ ...config, method: 'DELETE' })
  // }

  // patch<T>(config: HYRequestConfig<T>): Promise<T> {
  //   return this.request<T>({ ...config, method: 'PATCH' })
  // }
}

export default HYRequest
