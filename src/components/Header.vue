<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo" href="/">
        <img src="../assets/logo-4.png" alt="layui" />
      </a>
      <!-- <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/">
            <i class="iconfont icon-jiaoliu"></i>交流
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="case/case.html">
            <i class="iconfont icon-iconmingxinganli"></i>案例
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="http://www.layui.com/" target="_blank">
            <i class="iconfont icon-ui"></i>框架
          </a>
        </li>
      </ul> -->

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="!isShow">
          <li class="layui-nav-item">
            <router-link to="/user" class="iconfont icon-touxiang layui-hide-xs"></router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name: 'reg'}">注册</router-link>
          </li>
          <!-- <li class="layui-nav-item layui-hide-xs">
            <a href onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" title="QQ登入"
              class="iconfont icon-qq"></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a href onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" title="微博登入"
              class="iconfont icon-weibo"></a>
          </li> -->
        </template>

        <!-- 登入后的状态 -->
        <template v-else>
          <!-- 鼠标移入移出方法控制基本设置显隐 -->
          <li class="layui-nav-item" @mouseover="show()" @mouseleave="hide()">
            <a class="fly-nav-avatar" href="javascript:;">
              <cite class="layui-hide-xs">{{ userInfo.name }}</cite>
              <!-- <i class="iconfont icon-renzheng layui-hide-xs" title="认证信息：layui 作者"></i> -->
              <i class="layui-badge fly-badge-vip layui-hide-xs" v-show="userInfo.isVip !== '0'">VIP{{ userInfo.isVip }}</i>
              <img :src="userInfo.pic">
            </a>
            <dl class="layui-nav-child layui-anim layui-anim-upbit" :class="{ 'layui-show': isHover }">
              <dd><router-link :to="{name: 'info'}"><i class="layui-icon">&#xe620;</i>基本设置</router-link></dd>
              <dd><router-link :to="{name: 'msg'}"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息</router-link></dd>
              <dd><router-link :to="{name: 'home', params: {uid: userInfo._id}}"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</router-link></dd>
              <hr style="margin: 5px 0;">
              <dd><a href="javascript:void(0)" style="text-align: center;" @click="logout()">退出</a></dd>
            </dl>
          </li>

          <div>
            <div v-show="num.message && num.message !== 0" class="fly-nav-msg">{{ num.message }}</div>
            <transition name="fade">
              <div class="layui-layer-tips" v-show="hasMsg">
                <div class="layui-layer-content">
                  您有{{ num.message }}条未读消息
                  <i class="layui-layer-TipsG layui-layer-TipsB"></i>
                </div>
              </div>
            </transition>
          </div>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      isHover: false, // 操作菜单显隐开关
      hoverCtrl: {},
      hasMsg: false
    }
  },

  methods: {
    show () {
      clearTimeout(this.hoverCtrl)
      // 当鼠标移入头像,显示操作菜单
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true
      }, 200)
    },

    hide () {
      clearTimeout(this.hoverCtrl)
      // 当鼠标移出头像,隐藏操作菜单
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false
      }, 500)
    },

    logout () {
      this.$confirm('确定退出吗?', () => {
        localStorage.clear()
        this.$store.commit('setToken', '')
        this.$store.commit('setUserInfo', '')
        this.$store.commit('setIsLogin', false)
        this.$router.push('/', () => { }) // 加上()=>{}是为了防止报错
      }, () => {})
    }
  },

  watch: {
    num (newval, oldval) {
      if (newval.event && newval !== oldval) {
        this.hasMsg = true
        setTimeout(() => {
          this.hasMsg = false
        }, 2000)
      }
    }
  },

  computed: {
    ...mapState({
      num: state => state.num
    }),

    isShow () {
      return this.$store.state.isLogin
    },

    userInfo () {
      return this.$store.state.userInfo || {
        name: '',
        pic: '',
        isVip: 0
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.fly-logo{
  left: -15px;
  top: -10px;
  margin-left: 15px;
}

.layui-layer-tips {
  position: absolute;
  white-space: nowrap;
  right: 0;
  top: 60px;
  z-index: 2400;
}
</style>
