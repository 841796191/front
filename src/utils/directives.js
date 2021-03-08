import { escapeHtml } from '../utils/escapeHtml'

export default {
  richtext: {
    bind: function (el, binding, vnode) {
      // 只更新初始化那次
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function (el, binding, vnode) {
      // 内容更新时触发
      el.innerHTML = escapeHtml(binding.value)
    }
  }
}
