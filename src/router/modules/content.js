const Add = () => import(/* webpackChunName: 'add' */ '../../components/contents/Add.vue')
const Edit = () => import(/* webpackChunName: 'edit' */ '../../components/contents/Edit.vue')
const Detail = () => import(/* webpackChunName: 'detail' */ '../../components/contents/Detail.vue')

export default [
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
    beforeEnter (to, from, next) {
      // 正常情况 从detail页面到编辑页面,并且帖子未结帖
      if (
        ['detail', 'mypost'].indexOf(from.name) !== -1 &&
        to.params.page &&
        to.params.page.isEnd === '0'
      ) {
        next()
      } else {
        // 用户在edit页面刷新的情况
        const editData = localStorage.getItem('editData')
        // 若有未编辑完的内容则继续
        if (editData && editData !== '') {
          const editObj = JSON.parse(editData)
          if (editObj.isEnd === '0') {
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
    component: Detail,
    meta: {
      // 通过后台接口动态添加到路由 addRoutes
      types: ['get', 'add', 'delete']
    }
  }
]
