<template>
  <div>
    <ul class="fly-list">
      <li style="padding-left:20px;" v-for="(item,index) in items" :key="'listitem' + index">
        <!-- 头像 -->
        <!-- <router-link :to="{name: 'home', params: {uid: item.uid._id}}" class="fly-avatar">
          <img src="/img/header.jpg" alt="贤心"/>
        </router-link> -->
        <!-- 分类/标题 -->
        <h2>
          <a class="layui-badge">{{item.catalog}}</a>
          <router-link :to="{name: 'detail', params: {tid: item._id}}">{{item.title}}</router-link>
        </h2>
        <!-- 昵称 -->
        <div class="fly-list-info">
          <router-link :to="{name: 'home', params: {uid: item.uid._id}}" link>
            <cite>{{item.uid.name}}</cite>
            <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
            <!-- 是否vip -->
            <i
              class="layui-badge fly-badge-vip"
              v-if="item.uid.isVip !== '0'"
            >{{'VIP' + item.uid.isVip}}</i>
          </router-link>
          <!-- 发布时间 -->
          <span>{{item.created | moment}}</span>
          <!-- 悬赏积分 -->
          <span class="fly-list-kiss layui-hide-xs" title="悬赏积分">
            <i class="icontoimclds icon-jifen"></i>
            {{item.fav}}
          </span>

          <span class="layui-badge fly-badge-accept layui-hide-xs" v-show="item.isEnd !== '0'">已结</span>
          <!-- 回答数量 -->
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i>
            {{item.answer}}
          </span>
        </div>
        <!-- 帖子标签 -->
        <div class="fly-list-badge" v-show="item.tags.length > 0 && item.tags[0].name !== ''">
          <span
            class="layui-badge"
            v-for="(tag, index) in item.tags"
            :key="'tag' + index"
            :class="tag.class"
          >{{tag.name}}</span>
        </div>
      </li>
    </ul>
    <div style="text-align: center" v-show="isShow">
      <div class="laypage-main" v-if="!isEnd">
        <a @click.prevent="more()" class="laypage-next">更多求解</a>
      </div>
      <div class="nomore gray" v-else>没有更多了</div>
    </div>
  </div>
</template>

<script>

// import moment from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'
// import 'dayjs/locale/zh-cn'
// import _ from 'lodash'
// moment.extend(relativeTime)
export default {
  name: 'listitem',
  props: {
    lists: {
      default: () => [],
      type: Array
    },
    isShow: {
      default: true,
      type: Boolean
    },
    isEnd: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    items () {
      // 把文章列表中的分类由英文转为中文
      this.lists.map(item => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'discuss':
            item.catalog = '交流'
            break
        }
      })
      // console.log(this.lists)
      return this.lists
    }
  },
  methods: {
    more () {
      this.$emit('nextpage')
    }
  }
  // filters: {
  //   moment (date) {
  //     // 超过7天，显示日期
  //     if (moment(date).isBefore(moment().subtract(7, 'days'))) {
  //       return moment(date).format('YYYY-MM-DD')
  //     } else {
  //       // 发布不超过7天 显示 1小时前，xx小时前，X天前
  //       return moment(date).locale('zh-cn').from(moment())
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import '../../assets/custom/iconfont.css';
.nomore {
  font-size: 16px;
  padding: 30px 0;
}
</style>
