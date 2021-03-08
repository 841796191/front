<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px;">
      <button @click="clearAll()" class="layui-btn layui-btn-danger" id="LAY_delallmsg">清空全部消息</button>
      <div id="LAY_minemsg" style="margin-top: 10px;">
        <!--<div class="fly-none">您暂时没有最新消息</div>-->
        <ul class="mine-msg">
          <li v-for="(item, index) in lists" :key="'comments' + index">
            <blockquote class="layui-elem-quote">
              <a href="/jump?username=Absolutely" target="_blank">
                <cite>{{ item.cuid.name }}</cite>
              </a>回答了您的求解
              <a target="_blank" href="/jie/8153.html/page/0/#item-1489505778669">
                <cite>{{ item.title }}</cite>
              </a>
            </blockquote>
            <div v-richtext="item.content"></div>
            <p><span>{{ item.created | moment }}</span>
            <a @click="clear(item)" href="javascript:;" class="layui-btn layui-btn-small layui-btn-danger fly-delete">删除</a></p>
          </li>
        </ul>

        <pagination
        v-show="total > 0"
        :total="total"
        :current="page"
        :hasTotal="true"
        :hasSelect="true"
        @changeCurrent="handleChange"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getMsg, setMsg } from '../../api/user'
import { mapState } from 'vuex'
import Pagination from '../modules/pagination/Index'
export default {
  name: 'user-msg',
  components: {
    Pagination
  },

  data () {
    return {
      lists: [],
      page: 0,
      limit: 10,
      total: 0,
      ws: {}
    }
  },

  mounted () {
    this.getMsgAll()
  },

  computed: mapState({
    // 实时取得未读消息数量数据, 这样才不会每次修改数据时提示显示
    num: state => state.num.message ? state.num.message : 0
  }),

  methods: {
    // 清空
    clearAll () {
      setMsg().then((res) => {
        if (res.code === 200) {
          // 清空所有消息
          this.lists = []
          this.$store.commit('setMessage', { message: 0 })
          this.total = 0
        }
      })
    },

    // 删除
    clear (item) {
      // 设置特定消息已读
      setMsg({ id: item._id }).then((res) => {
        if (res.code === 200) {
          // 重新请求数据
          this.getMsgAll()
          this.$store.commit('setMessage', { message: this.num - 1 })
        }
      })
    },

    getMsgAll () {
      getMsg({
        page: this.page,
        limit: this.limit
      }).then((res) => {
        console.log('msg: ', res.data)
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },

    handleChange (val) {
      console.log('current: ', val)
      this.page = val
      this.getMsgAll()
    }
  }
}

</script>

<style lang='scss' scoped>
</style>
