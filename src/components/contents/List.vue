<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a :class="{'layui-this': status ==='' && tag === ''}" @click.prevent="search()">综合</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '0'}" @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '1'}" @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '' && tag === '精华'}" @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{'layui-this': sort === 'created'}" @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this': sort === 'answer'}" @click.prevent="search(4)">按热议</a>
      </span>
    </div>
    <list-item :lists="lists" :isEnd="isEnd" @nextpage="nextPage()"></list-item>
  </div>
</template>

<script>
import listMix from '../../mixin/list'
import ListItem from './ListItem'
export default {
  name: 'list',
  mixins: [listMix],
  data () {
    return {
      status: '',
      isRepeat: false, // 请求数据的状态变量
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      isEnd: false, // 控制 更多按钮 开关, true为最后一页
      current: '', // 当前栏目
      lists: [] // 文章列表
    }
  },

  components: {
    ListItem
  },

  watch: {
    // 监听栏目变化 综合-未结-已结等
    current (newval, oldval) {
      // console.log('current: ' + newval + ',' + oldval)
      this.init()
    },

    '$route' (newval, oldval) { // 监听路由变化,重新获取catalog并请求数据
      /* eslint-disable */
      let catalog = this.$route.params['catalog']
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.init()
    }
  },

  methods: {
    search (val) {
      if (typeof val === 'undefined' && this.current === '') {
        return
      }
      this.current = val
      console.log(val)
      switch (val) {
        // 未结贴
        case 0:
          this.status = '0'
          this.tag = ''
          break
        // 已结贴
        case 1:
          this.status = '1'
          this.tag = ''
          break
        // 查询"精华"标签
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        // 按照时间去查询
        case 3:
          this.sort = 'created'
          break
        // 按照评论数去查询
        case 4:
          this.sort = 'answer'
          break
        // 综合查询
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
      }
    }
  }
}

</script>

<style lang='scss' scoped>
</style>
