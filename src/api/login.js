/*
 * @Author: your name
 * @Date: 2020-12-27 15:33:29
 * @LastEditTime: 2021-02-22 08:40:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\api\login.js
 */
import axios from '@/utils/request'

/**
 * @description:获取验证码
 * @param {*} sid 唯一标识符
 * @return {*}
 */
const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

/**
 * @description:找回密码
 * @param {*} option 用户信息(邮箱、验证码)
 * @return {*}
 */
const forget = (option) => {
  return axios.post('/forget', {
    ...option
  })
}

/**
 * @description:登录
 * @param {*} loginInfo 登录信息
 * @return {*}
 */
const login = (loginInfo) => {
  return axios.post('/login/login', {
    ...loginInfo
  })
}

/**
 * @description:注册
 * @param {*} regInfo 注册信息
 * @return {*}
 */
const reg = (regInfo) => {
  return axios.post('/login/reg', {
    ...regInfo
  })
}

export {
  getCode,
  forget,
  login,
  reg
}
