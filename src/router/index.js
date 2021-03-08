import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'
import jwt from 'jsonwebtoken' // 设置token过期时间
import moment from 'moment'

const Login = () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '../views/Forget.vue')
const Index = () => import(/* webpackChunName: 'index' */ '../views/channels/Index.vue')
const Template1 = () => import(/* webpackChunName: 'template1' */ '../views/channels/Template1.vue')
const Center = () => import(/* webpackChunName: 'center' */ '../views/Center.vue')
const UserCenter = () => import(/* webpackChunName: 'user-center' */ '../components/user/Center.vue')
const Settings = () => import(/* webpackChunName: 'settings' */ '../components/user/Settings.vue')
const Posts = () => import(/* webpackChunName: 'user-posts' */ '../components/user/Posts.vue')
const Msg = () => import(/* webpackChunName: 'user-msg' */ '../components/user/Msg.vue')
const Others = () => import(/* webpackChunName: 'others' */ '../components/user/Others.vue')
const User = () => import(/* webpackChunName: 'user' */ '../views/User.vue')
const MyInfo = () => import(/* webpackChunName: 'info' */ '../components/user/common/MyInfo.vue')
const PassWd = () => import(/* webpackChunName: 'passwd' */ '../components/user/common/PassWd.vue')
const PicUpload = () => import(/* webpackChunName: 'picupload' */ '../components/user/common/PicUpload.vue')
const Accounts = () => import(/* webpackChunName: 'accounts' */ '../components/user/common/Accounts.vue')
const MyPost = () => import(/* webpackChunName: 'mypost' */ '../components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunName: 'mycollection' */ '../components/user/common/MyCollection.vue')
const NotFound = () => import(/* webpackChunName: 'notfound' */ '../views/NotFound.vue')
const Confirm = () => import(/* webpackChunName: 'confirm' */ '../views/Confirm.vue')
const Reset = () => import(/* webpackChunName: 'reset' */ '../views/Reset.vue')
const Add = () => import(/* webpackChunName: 'add' */ '../components/contents/Add.vue')
const Edit = () => import(/* webpackChunName: 'edit' */ '../components/contents/Edit.vue')
const Detail = () => import(/* webpackChunName: 'detail' */ '../components/contents/Detail.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: Index
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Template1
      }
    ]
  },
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
      // console.log('TCL: from', from) // 从哪个页面来
      // console.log('TCL: to', to) // 到哪个页面
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
  },
  {
    path: '/add',
    name: 'add',
    component: Add,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:tid',
    props: true,
    name: 'edit',
    component: Edit,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      // 正常情况 从detail页面到编辑页面,并且帖子未结帖
      if (['detail', 'mypost'].indexOf(from.name) !== -1 && to.params.page && to.params.page.isEnd === '0') {
        next()
      } else {
        // 用户在edit页面刷新的情况
        const editData = localStorage.getItem('editData')
        // 若有未编辑完的内容则继续
        if (editData && editData !== '') {
          const editobj = JSON.parse(editData)
          if (editobj.isEnd === '0') {
            next()
          } else {
            next('/')
          }
        } else {
          // 没有未编辑完的内容,返回首页
          next('/')
        }
      }
    }
  },
  {
    path: '/detail/:tid',
    name: 'detail',
    props: true,
    component: Detail
  },
  {
    path: '/user/:uid', // 我的主页
    name: 'home',
    props: true,
    component: User
  },
  {
    path: '/center',
    component: Center,
    meta: { requiresAuth: true },
    linkActiveClass: 'layui-this',
    children: [
      {
        path: '',
        name: 'center',
        component: UserCenter
      },
      {
        path: '/set',
        component: Settings,
        children: [
          {
            path: '',
            name: 'info',
            component: MyInfo
          },
          {
            path: 'pic',
            name: 'pic',
            component: PicUpload
          },
          {
            path: 'passwd',
            name: 'passwd',
            component: PassWd
          },
          {
            path: 'account',
            name: 'account',
            component: Accounts
          }
        ]
      },
      {
        path: 'posts',
        component: Posts,
        children: [
          {
            path: '',
            name: 'mypost',
            component: MyPost
          },
          {
            path: 'mycollection',
            name: 'mycollection',
            component: MyCollection
          }
        ]
      },
      {
        path: 'msg',
        name: 'msg',
        component: Msg
      },
      {
        path: 'others',
        name: 'others',
        component: Others
      }
    ]
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]
// 如果使用linkActiveClass,则会有 根路径和当前路径两个路由激活
const router = new VueRouter({
  linkExactActiveClass: 'layui-this', // 设置routerlink标签激活样式
  routes
})

router.beforeEach((to, from, next) => {
  // vuex中没数据或刷新页面或进入页面立刻从本地读取信息
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    // console.log('payload:' + payload)
    // console.log(moment().isBefore(moment(payload.exp * 1000)))

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
