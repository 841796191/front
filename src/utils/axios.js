// 封装axios请求,返回重新封装的数据格式
// 对错误统一处理
import axios from 'axios'
import errorHandle from './errorHandle'
import store from '../store/index'
import publicConfig from '../config/index'

// 取消请求的函数
const CancelToken = axios.CancelToken

// 使用es6封装axios
class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.pending = {} // 取消请求的变量
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

  // 执行取消请求的函数
  removePending (key, isRequest = false) {
    // if条件为true说明对应url已经发起请求,取消上一次请求,执行cancel方法
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }

  // 设定拦截器
  interceptors (instance) {
    instance.interceptors.request.use((config) => {
      let isPublic = false
      // 判断请求是否是公告路径,是则不加鉴权头信息
      publicConfig.publicPath.map((path) => {
        isPublic = isPublic || path.test(config.url)
      })

      // 给请求加上Authorization
      const token = store.state.token
      if (!isPublic && token) {
        config.headers.Authorization = 'Bearer ' + token
      }

      // 利用拦截器取消重复请求
      const key = config.url + '&' + config.method
      this.removePending(key, true)
      config.cancelToken = new CancelToken((c) => {
        // 记录发起的请求
        this.pending[key] = c
      })
      return config
    }, (err) => {
      errorHandle(err)
      return Promise.reject(err)
    })

    instance.interceptors.response.use((res) => {
      const key = res.config.url + '&' + res.config.method
      this.removePending(key)
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
