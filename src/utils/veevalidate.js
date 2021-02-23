import {
  extend,
  localize
} from 'vee-validate'
import {
  required,
  email,
  min,
  length,
  confirmed
} from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('email', email)
extend('min', min)
extend('required', required)
extend('length', length)
extend('confirmed', confirmed)
// 中文提示
localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}' // 全局提示信息格式
  },
  names: { // 对应组件中的name属性,例name=username ,则提示时为账号
    email: '邮箱',
    password: '密码',
    name: '昵称',
    username: '账号',
    code: '验证码'
  },
  fields: { // 自定义规则提示
    email: { // 这里的email对应上面的names属性中的email,也对应vedation-provider中的name属性
      email: '请输入正确的{_field_}', // 这里为validation-provider中使用的规则
      required: '请输入{_field_}!' // 覆盖全局提示规则
    }
  }
})
