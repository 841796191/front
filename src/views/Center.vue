<template>
    <div class="layui-container fly-marginTop fly-user-main">
      <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
        <li class="layui-nav-item" v-for="(item, index) in lists" :key="'center' + index">
          <router-link :to="{name: item.link}" :active-class="item.activeClass">
            <!-- 使用阿里图标库的图标,需要加上类名iconfont,
            这里iconfont跟layui框架的图标冲突,改为icontoimclds(在图标网上编辑项目处修改)-->
            <i class="icontoimclds" :class="item.icon"></i>
            {{ item.name }}
          </router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'center',
  data () {
    return {
      lists: [
        {
          name: '我的主页',
          icon: 'icon-documentcenter',
          link: 'home'
        },
        {
          name: '用户中心',
          icon: 'icon-home',
          link: 'center'
        },
        {
          name: '基本设置',
          icon: 'icon-xingzhuang',
          link: 'info',
          activeClass: 'layui-this' // 添加这个属性是因为显示基本设置的子路由时侧边栏的高亮会失效
          // 设置activeclass使基本设置根路径和其当前子路由高亮
        },
        {
          name: '我的帖子',
          icon: 'icon-documenttext',
          link: 'mypost',
          activeClass: 'layui-this'
        },
        {
          name: '我的消息',
          icon: 'icon-qipao',
          link: 'msg'
        },
        {
          name: '其他设置',
          icon: 'icon-xingzhuang604',
          link: 'others'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
// 引入阿里图标
@import '../assets/custom/iconfont.css';

.icontoimclds {
  margin-right: 10px;
}
</style>
