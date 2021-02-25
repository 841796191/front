import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/veevalidate-i18n'
import Alert from './components/modules/alert'
import Pop from './components/modules/pop'

Vue.use(Alert) // use使用alert文件夹的index文件
Vue.use(Pop)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
