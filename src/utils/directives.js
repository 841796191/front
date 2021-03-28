import { escapeHtml } from '../utils/escapeHtml'
import store from '../store/index'

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
  },
  hasRole: { // 判断用户角色
    inserted: function (el, binding) {
      // binding.value为指令传过来的值
      const roles = store.state.userInfo.roles || ['user']
      if (!roles.includes(binding.value)) {
        // 如果用户角色不是管理员,则删除该节点
        el.parentNode.removeChild(el) // 取得父节点的权限然后删除子节点
      }
    }
  },
  hasPermission: { // 判断用户权限
    // vnode是组件对象,里面的context包含路由信息等各种信息
    inserted: function (el, binding, vnode) {
      // console.log('vnode:', vnode)
      const types = vnode.context.$route.meta.types
      const values = binding.value
      console.log('types: ', types, 'value: ', values)
      let flag = true
      for (const v of values) {
        // 如果不包含需要的权限则删除元素
        if (!types.includes(v)) {
          flag = false
        }
      }
      if (!flag) {
        el.parentNode.removeChild(el)
      }
    }
  }
}
