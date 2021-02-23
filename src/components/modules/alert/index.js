import AlertComponents from './Alert.vue'

const Alert = {}

Alert.install = (Vue) => {
  // 使用extend把alert组件创建为一个子类,相当于把alert组件绑定到vue全局实例
  const AlertConstructor = Vue.extend(AlertComponents)
  // 创建组件
  const instance = new AlertConstructor()
  // 组件绑定挂载到元素上
  instance.$mount(document.createElement('div'))
  // 动态添加到instance的el上
  document.body.appendChild(instance.$el)

  Vue.prototype.$alert = (msg) => {
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
  }

  Vue.prototype.$confirm = (msg, success, cancel) => {
    instance.type = 'confirm'
    instance.msg = msg
    instance.isShow = true

    if (typeof success !== 'undefined') {
      instance.success = success
    }

    if (typeof cancel !== 'undefined') {
      instance.cancel = cancel
    }
  }
}

export default Alert
