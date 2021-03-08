<template>
    <div class="edit-wrap">
      <div class="layui-form-item layui-form-text">
        <div class="layui-input-block">
          <div ref="icons" class="layui-unselect fly-edit">
            <!-- 表情 -->
            <span @click="choose(0)">
              <i class="icontoimclds icon-biaoqing font-color"></i>
            </span>
            <!-- 图片 -->
            <span @click="choose(1)">
              <i class="icontoimclds icon-tupian font-color"></i>
            </span>
            <!-- 链接 -->
            <span @click="choose(2)">
              <i class="icontoimclds icon-lianjie font-color"></i>
            </span>
            <!-- 引用 -->
            <span class="quote font-color" @click="choose(3)">”</span>
            <!-- 插入代码 -->
            <span @click="choose(4)">
              <i class="icontoimclds icon-svg- font-color"></i>
            </span>
            <span class="font-color" @click="addHr()">hr</span>
            <!-- 预览 -->
            <span @click="choose(6)">
              <i class="icontoimclds icon-yulan font-color"></i>
            </span>
          </div>
          <textarea
          v-model="content"
          id="edit"
          class="layui-textarea fly-editor"
          name="content"
          ref="textEdit"
          @focus="focusEvent()"
          @blur="blurEvent()"
          ></textarea>
        </div>
      </div>

      <div ref="modal">
        <face :isShow="current === 0" @addEvent="addFace" @closeEvent="closeModal()"></face>
        <img-upload :isShow="current === 1" @addEvent="addPic" @closeEvent="closeModal()"></img-upload>
        <link-add :isShow="current === 2" @addEvent="addLink" @closeEvent="closeModal()"></link-add>
        <quote :isShow="current === 3" @addEvent="addQuote" @closeEvent="closeModal()"></quote>
        <code-input :isShow="current === 4"
        @addEvent="addCode"
        @closeEvent="closeModal()"
        :width="codeWidth"
        :height="codeHeight"></code-input>
        <preview :isShow="current === 6" :content="content" @closeEvent="closeModal()"></preview>
      </div>
    </div>
</template>

<script>
import Face from './Face'
import ImgUpload from './ImgUpload'
import LinkAdd from './LinkAdd'
import Quote from './Quote'
import CodeInput from './Code'
import Preview from './Preview'

export default {
  name: 'editor',
  props: ['initContent'],
  components: {
    Face,
    ImgUpload,
    LinkAdd,
    Quote,
    CodeInput,
    Preview
  },

  data () {
    return {
      current: '',
      codeWidth: 400,
      codeHeight: 200,
      content: '',
      pos: '' // 光标位置
    }
  },

  watch: { // 监听评论信息发布成功后清空编辑器
    initContent (newval, oldval) {
      this.content = newval
    }
  },

  updated () {
    // 当编辑内容变化时把编辑内容实时传给父组件
    this.$emit('changeContent', this.content)
  },

  methods: {
    closeModal () {
      this.current = ''
    },

    choose (index) {
      if (index === this.current) {
        this.closeModal()
      } else {
        this.current = index
      }
    },
    // 获得焦点时获取光标位置
    focusEvent () {
      this.getPos()
    },
    // 失去焦点时获取光标位置
    blurEvent () {
      this.getPos()
    },
    // 计算光标当前位置
    getPos () {
      let cursorPos = 0
      const elem = document.getElementById('edit')

      if (document.selection) {
        // IE
        const selectRange = document.selection.createRange() // 获取光标位置
        selectRange.moveStart('character', -elem.value.length) // 获得鼠标文本域左侧位置长度
        cursorPos = selectRange.text.length
      } else if (elem.selectionStart || elem.selectionStart === '0') {
        cursorPos = elem.selectionStart
      }
      this.pos = cursorPos
    },
    // 插入表情
    addFace (item) {
      // console.log('addFace:', item)
      const insertContent = ` face${item}`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 插入图片链接
    addPic (item) {
      const insertContent = ` img[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 插入链接
    addLink (item) {
      const insertContent = ` a(${item})[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 插入代码
    addCode (item) {
      const insertContent = ` \n[pre]\n${item}\n[/pre]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 插入引用
    addQuote (item) {
      const insertContent = ` \n[quote]\n${item}\n[/quote]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 插入hr
    addHr () {
      this.insert('\n[hr]')
      this.pos += 5
    },

    handleBodyClick (e) {
      console.log('bodyclick')
      e.stopPropagation() // 阻止事件冒泡
      // contains用于判断传入的节点是否为该节点后代节点,若是则不触发closeEvent函数
      if (!(this.$refs.icons.contains(e.target) || this.$refs.modal.contains(e.target))) {
        this.current = ''
      }
    },
    // 插入
    insert (val) {
      if (typeof this.content === 'undefined') {
        return
      }
      // 分割成数组进行插入
      const tmp = this.content.split('')
      tmp.splice(this.pos, 0, val)
      this.content = tmp.join('')
    }
  },

  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },

  beforeDestroy () {
    // 移除nextTick添加的点击事件
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang='scss'>
@import '../../../assets/custom/iconfont.css';
// vue过渡动画,给face组件命名name="fade"
.fade-leave-active {
  animation: bounceOut 0.3s;
}

.fade-enter-active, .fade-enter-to {
  animation: bounceIn 0.3s;
}

.edit-wrap {
  position: relative;
}

.fly-editor {
  height: 260px;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}

.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 100;
  background: #fff;
}
.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
