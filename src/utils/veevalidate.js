import { extend, localize } from 'vee-validate'
/* eslint camelcase: 0 */
import { required, email, min, max, length, confirmed, is_not } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('email', email)
extend('min', min)
extend('required', required)
extend('max', max)
extend('length', length)
extend('confirmed', confirmed)
extend('is_not', is_not)
// 中文提示
localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}' // 全局提示信息格式
  },
  // 与validation-provider中的name对应
  // key为name, value为对应的中文field名称
  names: { // 对应组件中的name属性,例name=username ,则提示时为账号
    email: '邮箱',
    password: '密码',
    name: '昵称',
    username: '账号',
    code: '验证码',
    oldpassword: '旧密码',
    repassword: '确认密码',
    title: '标题',
    catalog: '分类'
  },
  fields: { // 自定义规则提示
    catalog: {
      is_not: '请选择{_field_}'
    },
    email: { // 这里的email对应上面的names属性中的email,也对应vedation-provider中的name属性
      email: '请输入正确的{_field_}', // 这里为validation-provider中使用的规则
      required: '请输入{_field_}!' // 覆盖全局提示规则
    },
    name: {
      min: (field, { length }) => {
        /* eslint-disable */
        return `请在${field}输入至少${legnth}个字符`
      }
    },
    password: {
      confirmed: (field, { target }) => {
        return `两次输入的${field}不一致!`
      }
    }
  }
})
