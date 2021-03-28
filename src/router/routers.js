import Home from '../views/Home.vue'
import users from './modules/user'
import login from './modules/login'
import content from './modules/content'

const Index = () => import(/* webpackChunName: 'index' */ '../views/channels/Index.vue')
const Template1 = () => import(/* webpackChunName: 'template1' */ '../views/channels/Template1.vue')
const NotFound = () => import(/* webpackChunName: 'notfound' */ '../views/NotFound.vue')

export default {
  linkExactActiveClass: 'layui-this',
  routes: [
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
    ...content,
    ...login,
    ...users,
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
}
