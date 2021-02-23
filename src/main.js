import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/veevalidate-i18n'
import Alert from './components/modules/alert'

Vue.use(Alert) // use使用alert文件夹的index文件
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
