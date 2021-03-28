import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index'
// import jwt from 'jsonwebtoken' // 设置token过期时间
import moment from 'dayjs'
import routes from './routers'

Vue.use(VueRouter)

// 如果使用linkActiveClass,则会有 根路径和当前路径两个路由激活
const router = new VueRouter(routes)

router.beforeEach((to, from, next) => {
  // vuex中没数据或刷新页面或进入页面立刻从本地读取信息
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  if (token !== '' && token !== null) {
    // const payload = jwt.decode(token)
    // console.log('payload:' + payload)
    // console.log(moment().isBefore(moment(payload.exp * 1000)))

    const payload = JSON.parse(atob(token.split('.')[1]))
    // 判断token是否过期
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 取localStorage中缓存的token和用户信息存储到vuex
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)

      if (!store.state.ws) {
        store.commit('initWebsocket', {})
      }
    } else {
      localStorage.clear()
    }
  }

  // 根据meta判断页面是否需要登录才能访问
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // vuex中的数据一刷新就会丢失,所以需要从本地读取数据判断,每次刷新都会从本地读取(前面代码作用)
    const isLogin = store.state.isLogin
    // 若vuex中有数据
    if (isLogin) {
      // 已经登录
      // 权限判断,meta元数据
      next()
    } else {
      // 未登录
      next('/login')
    }
  } else {
    // 不需登录即可访问
    next()
  }
})

export default router
