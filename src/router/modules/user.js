const Center = () => import(/* webpackChunName: 'center' */ '../../views/Center.vue')
const UserCenter = () => import(/* webpackChunName: 'user-center' */ '../../components/user/Center.vue')
const Settings = () => import(/* webpackChunName: 'settings' */ '../../components/user/Settings.vue')
const Posts = () => import(/* webpackChunName: 'user-posts' */ '../../components/user/Posts.vue')
const Msg = () => import(/* webpackChunName: 'user-msg' */ '../../components/user/Msg.vue')
const Others = () => import(/* webpackChunName: 'others' */ '../../components/user/Others.vue')
const User = () => import(/* webpackChunName: 'user' */ '../../views/User.vue')
const MyInfo = () => import(/* webpackChunName: 'info' */ '../../components/user/common/MyInfo.vue')
const PassWd = () => import(/* webpackChunName: 'passwd' */ '../../components/user/common/PassWd.vue')
const PicUpload = () => import(/* webpackChunName: 'picupload' */ '../../components/user/common/PicUpload.vue')
const Accounts = () => import(/* webpackChunName: 'accounts' */ '../../components/user/common/Accounts.vue')
const MyPost = () => import(/* webpackChunName: 'mypost' */ '../../components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunName: 'mycollection' */ '../../components/user/common/MyCollection.vue')

export default [
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
        path: 'set',
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
    path: '/user/:uid',
    name: 'home',
    props: true,
    component: User
  }
]
