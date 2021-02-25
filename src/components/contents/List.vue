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
import { getList } from '@/api/content'
import ListItem from './ListItem'
export default {
  name: 'list',
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
      lists: [ // 文章列表
        {
          uid: {
            name: 'imooc',
            isVip: 1
          },
          title: '大前端课程',
          content: '',
          created: '2019-10-1 01:00:00',
          catalog: 'ask',
          fav: 40,
          reads: 10,
          answer: 0,
          status: 0,
          isTop: 0,
          tags: [
            {
              name: '精华',
              class: 'layui-bg-red'
            },
            {
              name: '热门',
              class: 'layui-bg-blue'
            }
          ]
        }
      ]
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

  mounted () {
    // console.log(this.$route.params['catalog'])
    // 当有路由跳转时获取分类代码
    /* eslint-disable */
    let catalog = this.$route.params['catalog']
    if (typeof catalog !== 'undefined' && catalog !== '') {
      this.catalog = catalog
    }
    // 获取文章列表
    this._getLists()
  },

  methods: {
    init () {
      this.page = 0
      this.lists = []
      this.isEnd = false
      this._getLists()
    },

    _getLists () {
      if (this.isRepeat) return // isRepeat为true则当前正在请求数据,避免重复请求
      if (this.isEnd) return // isEnd为true,则是最后一页

      this.isRepeat = true // 正在请求

      const options = {
        catalog: this.catalog,
        isTop: 0,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      getList(options).then((res) => {
        this.isRepeat = false // 请求结束
        console.log(res)
        // 对于异常的判断 res.code非200,给出提示
        // 判断是否lists长度为0,如果为0直接赋值
        // 当lists长度不为0,后面请求的数据与前面的数据拼接
        if (res.code === 200) {
          // 判断res.data的长度,如果小于20条,则是最后页
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch((err) => {
        this.isRepeat = false
        if (err) {
          this.$alert(err.message)
        }
      })
    },

    nextpage () {
      this.page++
      this._getLists()
    },

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
