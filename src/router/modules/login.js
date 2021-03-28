const Login = () => import(/* webpackChunkName: 'login' */ '../../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '../../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '../../views/Forget.vue')
const Confirm = () => import(/* webpackChunName: 'confirm' */ '../../views/Confirm.vue')
const Reset = () => import(/* webpackChunName: 'reset' */ '../../views/Reset.vue')

export default [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: Confirm
  },
  {
    path: '/reset',
    name: 'reset',
    component: Reset
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    beforeEnter: (to, from, next) => {
      if (from.name === 'login') {
        next()
      } else {
        next('/login') // 当页面不是从登录页到注册页时重定向到登录页
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  }
]
