<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel" pad20 style="padding-top: 5px;">
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">
              编辑帖子
            </li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <form>
                <validation-observer ref="observer" v-slot="{ validate }">
                <div class="layui-row layui-col-space15 layui-form-item">
                  <div class="layui-col-md3">
                      <div class="layui-row">
                        <label class="layui-form-label">所在专栏</label>
                        <div class="layui-input-block">
                          <div class="layui-unselect layui-form-select">
                            <div class="layui-select-title">
                              <input v-model="catalogs[cataIndex].text"
                              type="text"
                              placeholder="请选择"
                              readonly
                              class="layui-input layui-unselect layui-disabled">
                              <i class="layui-edge"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div class="layui-col-md9">
                      <div class="latui-row">
                        <label for="L_title" class="layui-form-label">标题</label>
                        <div class="layui-input-block">
                          <input v-model="title" type="text" id="L_title" name="title" class="layui-input">
                          <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                        </div>
                      </div>
                  </div>
                </div>
                <editor @changeContent="add" :initContent="content"></editor>
                <div class="layui-form-item">
                  <div class="layui-inline">
                    <label class="layui-form-label">悬赏积分</label>
                    <div class="layui-input-inline" style="width: 190px;">
                        <div class="layui-unselect layui-form-select">
                          <div class="layui-select-title">
                            <input v-model="favList[favIndex]"
                            type="text"
                            placeholder="请选择"
                            readonly
                            class="layui-input layui-unselect layui-disabled">
                            <i class="layui-edge"></i>
                          </div>
                        </div>
                    </div>
                    <div class="layui-form-mid layui-word-aux">发表后无法更改积分</div>
                  </div>
                </div>
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
                  <button type="button" class="layui-btn" @click="validate().then(submit)">立即发布</button>
                </div>
                </validation-observer>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMix from '../../mixin/code'
import Editor from '../modules/editor/Editor.vue'
import { updatePost } from '../../api/content'

export default {
  name: 'edit',
  props: ['tid', 'page'],
  mixins: [CodeMix],
  components: {
    Editor
  },

  data () {
    return {
      cataIndex: 0,
      favIndex: 0,
      catalogs: [
        {
          text: '请选择',
          value: ''
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '讨论',
          value: 'discuss'
        },
        {
          text: '建议',
          value: 'advise'
        }
      ],
      favList: [20, 30, 50, 60, 80],
      content: '',
      title: ''
    }
  },

  mounted () {
    if (this.page) {
      console.log('edit: ', this.page)
      this.content = this.page.content
      this.title = this.page.title
      this.favIndex = this.favList.indexOf(parseInt(this.page.fav))
      this.cataIndex = this.catalogs.indexOf(this.catalogs.filter((item) => item.value === this.page.catalog)[0])
      // 缓存edit内容,将整个帖子所有状态存储在本地
      localStorage.setItem('editData', JSON.stringify(this.page))
    } else {
      // 页面上无page内容,可能是用户进行了刷新,则取本地缓存内容
      const saveData = localStorage.getItem('editData')
      if (saveData && saveData !== '') {
        this.$confirm('是否需要加载未编辑完的内容？', () => {
          const obj = JSON.parse(saveData)
          this.content = obj.content
          this.title = obj.title
          this.cataIndex = obj.cataIndex
          this.favIndex = obj.favIndex
        }, () => {
          localStorage.setItem('editData', '')
        })
      }
    }
  },

  methods: {
    chooseCatalog (item, index) {
      this.cataIndex = index
    },

    chooseFav (item, index) {
      this.favIndex = index
    },

    changeFav () {
      this.isSelect_fav = !this.isSelect_fav
    },

    changeSelect () {
      this.isSelect = !this.isSelect
    },
    // 接收编辑器组件传递的文章
    add (val) {
      this.content = val
      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex
      }
      // 将未完成的帖子保存在浏览器本地上
      if (this.title.trim() !== '' && this.content.trim() !== '') {
        // 将本地存储的帖子状态取出
        const editData = localStorage.getItem('editData')
        let newObj = {}
        if (editData && editData !== '') {
          newObj = { ...saveData, ...JSON.parse(editData) }
        }
        localStorage.setItem('editData', JSON.stringify(newObj))
      }
    },

    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }

      if (this.content.trim() === '') {
        this.$alert('文章内容不得为空')
        return
      }

      // 更新文章
      updatePost({
        tid: this.tid,
        title: this.title,
        content: this.content,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          // 清除本地已经发布的内容
          localStorage.setItem('editData', '')
          this.$pop('', '更新成功~~~')
          setTimeout(() => {
            this.$router.push({ name: 'detail', params: { tid: this.tid } })
          }, 1000)
        } else {
          this.$alert(res.msg)
        }
      })
    }
  }
}

</script>

<style lang='scss' scoped>
</style>
