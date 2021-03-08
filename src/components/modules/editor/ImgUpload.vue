<template>
    <transition name="fade">
      <div class="layui-layer-page layui-layer-border edit-content"
      v-show="isShow">
        <div class="layui-layer-title">
          插入图片
        </div>
        <div class="layui-layer-content">
          <ul class="layui-form layui-form-pane">
            <li class="layui-form-item">
              <label for="" class="layui-form-label">URL</label>
              <div class="layui-input-inline">
                <input type="text"
                id="fileInput"
                v-model="pic"
                placeholder="粘贴图片地址或者点击上传"
                class="layui-input">
              </div>

              <button type="button" class="layui-btn layui-btn-primary">
                <label for="uploadImg">
                  <i class="layui-icon layui-icon-upload"></i>上传图片
                </label>
              </button>

              <input type="file" @change="upload" name="file" id="uploadImg" class="layui-upload-file">
            </li>
            <li class="layui-form-item">
              <button type="button" @click="submit()" class="layui-btn btn-color">确认</button>
            </li>
          </ul>
        </div>
        <span class="layui-layer-setwin" @click.stop="close()">
          <a href="javaseript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
        </span>
      </div>
    </transition>
</template>

<script>
import { uploadImg } from '../../../api/content'

export default {
  name: 'ImgUpload',
  props: ['isShow'],

  data () {
    return {
      pic: '', // 图片名称
      formData: '' // 图片数据
    }
  },

  methods: {
    // 点击表情时把表情的key传过去
    handleFaceClick (item) {
      console.log('faceclick')
      this.$emit('addEvent', item)
    },

    // handleBodyClick (e) {
    //   console.log('bodyclick')
    //   e.stopPropagation() // 阻止事件冒泡
    //   if (typeof this.ctrl === 'undefined') return
    //   // contains用于判断传入的节点是否为该节点后代节点

    //   // 触发隐藏本组件的关闭事件,改变isSHow状态
    //   // 判断是否点击到了非控制icon(表情) + 本组件 以外的地方

    //   // 当点击表情让表情组件显示时不触发handleBodyClick
    //   // 这里当点击图片上传图标或图片模态框,由于点击目标分别为ctrl、wrapper的后代,所以不触发函数
    //   if (!(this.ctrl.contains(e.target) || this.$refs.wrapper.contains(e.target))) {
    //     this.$emit('closeEvent')
    //     this.pic = ''
    //     this.formData = ''
    //   }
    // },

    close () {
      // 清空输入内容、选择文件
      this.$emit('closeEvent')
      this.pic = ''
      this.formData = ''
    },

    upload (e) {
      const file = e.target.files
      const formData = new FormData()

      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }

      // 上传图片
      uploadImg(this.formData).then((res) => {
        if (res.code === 200) {
          const baseUrl = 'http://localhost:3000'
          this.pic = baseUrl + res.data
        }
      })
      document.getElementById('uploadImg').value = ''
    },

    submit () {
      if (this.pic === '') {
        document.getElementById('fileInput').focus()
        this.$pop('shake', '请上传图片或复制链接')
        return
      }

      this.$emit('addEvent', this.pic)
      setTimeout(() => {
        // 恢复初始状态
        this.pic = ''
        this.formData = ''
        this.$emit('closeEvent')
      }, 0)
    }
  }

  // mounted () {
  //   this.$nextTick(() => {
  //     document.querySelector('body').addEventListener('click', this.handleBodyClick)
  //   })
  // },

  // beforeDestroy () {
  //   // 移除nextTick添加的点击事件
  //   document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  // }
}
</script>

<style lang='scss' scoped>
.layui-form-item {
  text-align: center;
}
.layui-form-pane {
  margin: 20px;
}
</style>
