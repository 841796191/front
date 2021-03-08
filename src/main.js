import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './utils/filter'
import directives from './utils/directives'

import '@/utils/veevalidate'
import Alert from './components/modules/alert'
import Pop from './components/modules/pop'

Vue.use(Alert) // use使用alert文件夹的index文件
Vue.use(Pop)
Vue.config.productionTip = false
// 绑定全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
// 绑定全局指令
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
