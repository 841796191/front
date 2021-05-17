<template>
  <div class="layui-container">
    <panel></panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{ page.title }}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span v-if="page.catalog === 'logs'" class="layui-badge layui-bg-green fly-detail-column">动态</span>
            <span v-else-if="page.catalog === 'share'" class="layui-badge layui-bg-green fly-detail-column">分享</span>
            <span v-else-if="page.catalog === 'ask'" class="layui-badge layui-bg-green fly-detail-column">提问</span>
            <span v-else-if="page.catalog === 'advise'" class="layui-badge layui-bg-green fly-detail-column">建议</span>
            <span v-else-if="page.catalog === 'discuss'" class="layui-badge layui-bg-green fly-detail-column">交流</span>
            <span v-else-if="page.catalog === 'notice'" class="layui-badge layui-bg-green fly-detail-column">公告</span>

            <span v-if="page.isEnd === '0'" class="layui-badge" style="background-color: #999;">未结</span>
            <span v-else class="layui-badge" style="background-color: #1E9FFF;">已结</span>

            <span v-show="page.isTop === '1'" class="layui-badge layui-bg-black">置顶</span>
            <span
            v-for="(tag, index) in page.tags"
            :key="'tags' + index"
            class="layui-badge"
            :class="tag.class">{{ tag.name }}</span>

            <!-- 管理员操作 -->
            <!-- <div v-hasRole="'admin'">
              <div class="fly-admin-box" data-id="123">
                <span v-hasPermission="['get','delete']" class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>

                <span v-if="page.isTop === '0'" class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span>
                <span v-else class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span> -->

                <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span>
                <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span> -->
              <!-- </div>
            </div> -->

            <span class="fly-list-nums">
              <a href="#comment"><i class="iconfont" title="回答">&#xe60c;</i> {{page.answer}}</a>
              <i class="iconfont" title="人气">&#xe60b;</i>{{page.reads}}
            </span>
          </div>
          <!-- 收藏、作者信息 -->
          <div class="detail-about">
            <a class="fly-avatar" href="../user/home.html">
              <img :src="page.uid ? page.uid.pic : '/img/bear-200-200.jpg'">
            </a>
            <div class="fly-detail-user">
              <a href="../user/home.html" class="fly-link">
                <cite>{{page.uid ? page.uid.name : 'a'}}</cite>
                <!-- <i class="iconfont icon-renzheng" title="认证信息"></i> -->
                <i class="layui-badge fly-badge-vip mr1"
                v-if="page.uid && page.uid.isVip !== '0' ? page.uid.isVip : false">
                  VIP{{page.uid.isVip}}
                </i>
              </a>
              <span>{{page.created | moment}}</span>
            </div>
            <div class="detail-hits">
              <span style="padding-right: 10px; color: #FF7200">悬赏：{{page.fav}}积分</span>
            </div>
          </div>
          <div class="layui-btn-container fly-detail-admin pt1">
            <router-link v-show="page.isEnd === '0'" :to="{name: 'edit', params: {tid: tid, page: page}}" class="layui-btn layui-btn-sm jie-admin">编辑</router-link>
            <a href
            @click.prevent="setCollect()"
            class="layui-btn btn-color layui-btn-sm jie-admin jie-admin-collect"
            :class="{'layui-btn-primary': page.isFav}">{{ page.isFav ? '取消收藏' : '收藏' }}</a>
          </div>
          <div class="detail-body photos" v-html="content"></div>
        </div>
        <!-- 回帖 -->
        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li data-id="111" class="jieda-daan" v-for="(item, index) in comments" :key="'comments' + index">
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href="">
                  <img :src="item.cuid ? item.cuid.pic : '/img/bear-200-200.jpg'">
                </a>
                <div class="fly-detail-user">
                  <a href="" class="fly-link">
                    <cite>{{item.cuid ? item.cuid.name : 'a'}}</cite>
                    <i v-if="item.cuid && item.cuid.isVip !== '0'" class="layui-badge fly-badge-vip">
                      VIP{{item.cuid.isVip}}
                    </i>
                  </a>

                  <span v-if="index === 0"></span>
                  <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                -->
                </div>

                <div class="detail-hits">
                  <span>{{ item.created | moment }}</span>
                </div>

                <i v-show="item.isBest === '1'" class="iconfont icon-caina" title="最佳答案"></i>
              </div>
              <div v-richtext="item.content" class="detail-body jieda-body photos"></div>
              <div class="jieda-reply">
                <span @click="hands(item)" class="jieda-zan" :class="{'zanok' : item.handed === '1'}" type="zan">
                  <i class="iconfont icon-zan"></i>
                  <em>{{item.hands}}</em>
                </span>
                <span type="reply" @click="reply(item)">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span type="edit"
                  @click="editComment(item)"
                  v-show="page.isEnd === '0' && item.cuid._id === user._id">编辑</span>
                  <!-- <span type="del">删除</span> -->
                  <span
                  @click="setBest(item)"
                  class="jieda-accept"
                  v-show="page.isEnd === '0' && item.cuid._id === user._id"
                  >采纳</span>
                </div>
              </div>
            </li>
            <!-- 无数据时 -->
            <li v-if="comments.length === 0" class="fly-none">消灭零回复</li>
          </ul>
          <!-- 下一页组件 -->
          <pagination
          v-show="comments.length > 0 && total > 0"
          :showEnd="true"
          :showType="'icon'"
          :hasSelect="false"
          :hasTotal="false"
          :total="total"
          :size="size"
          :current="current"
          @changeCurrent="handleChange"
          @changeLimit="handleLimit"></pagination>
          <div class="layui-form layui-form-pane">
            <form>
              <validation-observer ref="observer" v-slot="{ validate }">
                <editor @changeContent="addContent" :initContent="editInfo.content"></editor>
                <div class="layui-form-item">
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
                  <input type="hidden" name="jid" value="123">
                  <button class="layui-btn btn-color" type="button" @click="validate().then(submit)">提交回复</button>
                </div>
              </validation-observer>
            </form>
          </div>
        </div>
      </div>
      <div class="layui-col-md4">
        <hot-list></hot-list>
        <ads></ads>
        <links></links>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '../sidebar/HotList'
import Ads from '../sidebar/Ads'
import Links from '../sidebar/Links'
import Panel from '../Panel'
import Editor from '../modules/editor/Editor'
import CodeMixin from '../../mixin/code'
import Pagination from '../modules/pagination/Index'
import { getDetail } from '../../api/content'
import { getComments, addComment, updateComment, setCommentBest, setHands } from '../../api/comments'
import { escapeHtml } from '../../utils/escapeHtml'
import { scrollToElem } from '../../utils/common'
import { addCollect } from '../../api/user'

export default {
  name: 'Detail',
  mixins: [CodeMixin],
  props: ['tid'],
  components: {
    HotList,
    Ads,
    Links,
    Panel,
    Editor,
    Pagination
  },

  data () {
    return {
      total: 0,
      size: 10,
      current: 0,
      page: {},
      comments: [],
      editInfo: { // 编辑评论
        content: '', // 编辑评论内容
        code: '', // 验证码
        sid: '' // 唯一标识
      }
    }
  },

  mounted () {
    this.getPostDetail()
    this.getCommentsList()
  },

  watch: {
    tid (newVal, oldVal) {
      this.getPostDetail()
      this.getCommentsList()
    }
  },

  methods: {
    // 修改页数
    handleChange (val) {
      this.current = val
      this.getCommentsList()
    },
    // 修改限制条数
    handleLimit (val) {
      this.size = val
      this.getCommentsList()
    },

    // 获取帖子信息
    getPostDetail () {
      getDetail(this.tid).then((res) => {
        if (res.code === 200) {
          this.page = res.data
          console.log('page: ', res.data)
        }
      })
    },
    // 获取评论列表
    getCommentsList () {
      getComments({
        tid: this.tid,
        page: this.current,
        limit: this.size // 每页限制条数
      }).then((res) => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
          // console.log('comment: ', res.data)
        }
      })
    },
    // 获取编辑内容
    addContent (val) {
      this.editInfo.content = val
    },
    // 发表评论
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      // 用户未登录
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        this.$pop('shake', '请先登录')
        return
      }

      // 用户禁言状态判断
      const user = this.$store.state.userInfo
      if (user.status !== '0') {
        this.$pop('shake', '用户已被禁言,请联系管理员')
        return
      }

      this.editInfo.code = this.code
      this.editInfo.sid = this.$store.state.sid
      this.editInfo.tid = this.tid

      // 获取评论用户信息
      const cuid = {
        _id: user._id,
        pic: user.pic,
        name: user.name,
        isVip: user.isVip
      }
      // 更新评论时会通过给editInfo添加cid(该评论id)标识,新增评论则没有
      if (typeof this.editInfo.cid !== 'undefined' && this.editInfo.cid !== '') {
        const obj = { ...this.editInfo }
        /* eslint-disable */
        delete obj['item'] // item为原评论内容,不需要传给后台
        // console.log('obj:', obj)

        // 判断用户是否修改了内容
        if (this.editInfo.content === this.editInfo.item) {
          this.$pop('shake', '请确定编辑了内容~~')
          return
        }

        // 更新评论
        updateComment(obj).then((res) => {
          if (res.code === 200) {
            const temp = this.editInfo.item // 原评论内容
            temp.content = this.editInfo.content // 新评论内容
            this.$pop('', '更新评论成功')
            // 更新成功后清空回复内容
            this.code = ''
            this.editInfo.content = ''
            requestAnimationFrame(() => {
              this.$refs.observer && this.$refs.observer.reset()
            })
            // 更新评论列表
            this.comments.splice(this.comments.indexOf(this.editInfo.item), 1, temp)
          }
        })
        return
      }

      // 添加评论
      addComment(this.editInfo).then((res) => {
        if (res.code === 200) {
          this.$pop('', '发表评论成功')
          // 发表成功后清空回复内容
          this.code = ''
          this.editInfo.content = ''

          // 拼接用户信息展示
          res.data.cuid = cuid
          // 添加新的评论到评论列表
          this.comments.push(res.data)
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset()
          })

          // 刷新图形验证码
          this._getCode()
        } else {
          this.$alert(res.msg)
        }
      })
    },

    // 编辑
    editComment (item) {
      this.editInfo.content = item.content
      // 滚动到编辑器
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
      // 确定需要编辑的记录
      this.editInfo.cid = item._id
      this.editInfo.item = item
    },
    // 采纳
    setBest (item) {
      this.$confirm('确定采纳为最佳答案吗', () => {
        // 发送采纳为最佳答案请求
        setCommentBest({
          cid: item._id, // 评论id
          tid: this.tid // 帖子id
        }).then((res) => {
          if (res.code === 200) {
            this.$pop('', '设置最佳答案成功')
            item.isBest = '1'
            this.page.isEnd = '1' // 帖子对象
          }
        })
      }, () => {})
    },

    // 点赞
    hands (item) {
      // item._id为评论id, item.cuid里面包含评论人id昵称
      // console.log('item:', item)
      setHands({cid: item._id}).then((res) => {
        if (res.code === 200) {
          this.$pop('', '点赞成功')
          item.handed = '1' // 点赞高亮
          item.hands += 1 // 点赞数
        } else {
          this.$pop('shake', res.msg)
        }
      })
    },

    // 回复
    reply (item) {
      // 插入@ + name 到content
      // console.log('reply: ', item)
      const reg = /^@[\S]+/g
      if (this.editInfo.content) {
        // 评论框已经有内容
        if (reg.test(this.editInfo.content)) {
          // 评论框内容已经在回复其他人,这里替换为最新想要回复的人
          this.editInfo.content = this.editInfo.content.replace(reg, '@' + item.cuid.name + ' ')
        } else {
          if (this.editInfo.content !== '') {
            // 非空的情况,还没有 '回复人'
            this.editInfo.content = `@${item.cuid.name} ${this.editInfo.content}`
          }
        }
      } else {
        // 评论框为空
        this.editInfo.content = '@' + item.cuid.name + ' '
      }
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
    },

    // 设置/取消收藏
    setCollect () {
      const isLogin = this.$store.state.isLogin
      // 判断用户有无登录
      if (isLogin) {
        // 有登录则设置收藏数据
        const collect = {
          tid: this.tid,
          title: this.page.title,
          isFav: this.page.isFav ? 1 : 0
        }
        // 收藏
        addCollect(collect).then((res) => {
          if (res.code === 200) {
            this.page.isFav = !this.page.isFav
            this.$pop('', this.page.isFav ? '设置收藏成功' : '取消收藏成功')
          }
        })
      } else {
        this.$pop('shake', '请先登录后再进行收藏！')
      }
    }
  },

  computed: {
    content () {
      if (typeof this.page.content === 'undefined') {
        return ''
      }
      if (this.page.content.trim() === '') {
        return ''
      }
      return escapeHtml(this.page.content)
    },
    user () {
      return this.$store.state.userInfo
    }
  }
}

</script>

<style lang='scss' scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
}

.fly-admin-box {
  margin-left: 0;
  margin-top: 15px;
}

.fly-detail-info {
  span {
    margin-right: 5px;
  }
}
</style>
