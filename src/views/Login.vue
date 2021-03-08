<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{name: 'reg'}">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <!-- 校验整个表单 -->
          <validation-observer ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">用户名</label>
                    <!-- 表单验证 name为验证提示时使用的属性名 -->
                    <validation-provider name="email" rules="required|email" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="username"
                          v-model="username"
                          placeholder="请输入用户名"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <!-- 表单验证 -->
                    <validation-provider name="password" rules="required|min:6|max:16" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          name="password"
                          v-model="password"
                          placeholder="请输入密码"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <!-- 表单验证 -->
                    <validation-provider name="code" ref="codefield" rules="required|length:4" v-slot="{errors}">
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="code"
                            v-model="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class>
                          <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg"></span>
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <!-- 点击登录时validate会检验整个表单,符合要求才会调用请求函数submit -->
                    <button class="layui-btn" type="button" @click="validate().then(submit)">立即登录</button>
                    <span style="padding-left:20px;">
                      <router-link :to="{name: 'forget'}">忘记密码？</router-link>
                    </span>
                  </div>
                  <!-- <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a
                      href
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></a>
                    <a
                      href
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></a>
                  </div> -->
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate' // 表单验证
import { getCode, login } from '@/api/login' // 获取验证码
import uuid from 'uuid/v4'

export default {
  name: 'login',
  components: {
    ValidationProvider,
    ValidationObserver
  },

  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    }
  },

  mounted () {
    // 生成标识符与对应验证码一起存储
    let sid = ''
    if (localStorage.getItem('sid')) {
      // 判断浏览器有没有存储标识符,有则获取没有则生成一个标识符
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    console.log(sid)

    this._getCode()
  },

  methods: {
    // 获取验证码
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then((res) => {
        // console.log(res)
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    // 登录
    async submit () {
      // 读取校验结果,校验成功则调用login发起登录请求
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }

      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        // 登录成功
        if (res.code === 200) {
          // 存储用户登录名,因为后台已经拦截返回的登录名,所以前端自己加上
          res.data.username = this.username
          // 登录成功,vuex保存用户基本信息
          this.$store.commit('setUserInfo', res.data)
          // 修改登录状态
          this.$store.commit('setIsLogin', true)
          // 本地存储token
          this.$store.commit('setToken', res.token)
          this.username = ''
          this.password = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })

          this.$router.push({ name: 'index' })
          console.log(res)
          // 验证码错误
        } else if (res.code === 401) {
          // 前面验证信息以数组形式传递,所以这里也需要改成数组,不然显示不全
          this.$refs.codefield.setErrors([res.msg])
        }

        // 捕获错误
      }).catch((err) => {
        const data = err.response.data
        if (data.code === 500) {
          this.$alert('用户名密码校验失败,请检查')
        } else {
          this.$alert('服务器错误')
        }
        console.log(err.response)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 公用样式可以放在App.vue中
</style>
