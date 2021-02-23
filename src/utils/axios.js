// 封装axios请求,返回重新封装的数据格式
// 对错误统一处理
import axios from 'axios'
import errorHandle from './errorHandle'

// 使用es6封装axios
class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  // 获取axios配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  // 设定拦截器
  interceptors (instance) {
    instance.interceptors.request.use((config) => {
      return config
    }, (err) => {
      errorHandle(err)
      return Promise.reject(err)
    })

    instance.interceptors.response.use((res) => {
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, (err) => {
      errorHandle(err)
      return Promise.reject(err)
    })
  }

  // 创建实例
  request (options) {
    // 创建axios
    const instance = axios.create()
    // 合并配置
    const newOptions = Object.assign(this.getInsideConfig(), options)
    // 设置拦截器
    this.interceptors(instance)
    // 相当于axios(newOptions)
    return instance(newOptions)
  }

  get (url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config)
    return this.request(options)
  }

  post (url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

// const instance = axios.create({
//   baseURL: 'http://localhost:3000',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   timeout: 10000
// })

// instance.interceptors.request.use((config) => {
//   return config
// }, (err) => {
//   errorHandle(err)
//   return Promise.reject(err)
// })

// instance.interceptors.response.use((res) => {
//   if (res.status === 200) {
//     return Promise.resolve(res.data)
//   } else {
//     return Promise.reject(res)
//   }
// }, (err) => {
//   errorHandle(err)
//   return Promise.reject(err)
// })

export default HttpRequest
