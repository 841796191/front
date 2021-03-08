<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label for="pic" class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
          <input id="pic" type="file" name="file" accept="image/png,image/gif,image/jpg" @change="upload">
        </label>
        <img :src="pic">
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '../../../api/content'
import { updateUserInfo } from '../../../api/user'

export default {
  name: 'picupload',
  data () {
    return {
      // 判断userInfo & pic是否存在
      pic: (this.$store.state.userInfo && this.$store.state.userInfo.pic) ? this.$store.state.userInfo.pic : '/img/bear-200-200.jpg',
      formData: ''
    }
  },

  methods: {
    upload (e) {
      // console.log('e: ' + e)
      const file = e.target.files
      // 文件上传,可通过把文件加入formData中实现跟表单一样的上传
      const formData = new FormData()
      if (file.length > 0) {
        // append('name', file) 键值对
        formData.append('file', file[0])
        this.formData = formData
      }

      // 上传图片 -> uploadImg
      uploadImg(formData).then((res) => {
        // console.log('upload:', res)
        if (res.code === 200) {
          // 图片请求路径
          const baseUrl = 'http://localhost:3000'
          this.pic = baseUrl + res.data

          // 更新用户基本资料 -> updateUserInfo
          updateUserInfo({ pic: this.pic }).then((res) => {
            if (res.code === 200) {
              // 更新用户基本信息
              // 修改全局的 store 内用户基本信息
              const user = this.$store.state.userInfo
              user.pic = this.pic
              this.$store.commit('setUserInfo', user)
              this.$alert('图片上传成功')
            }
          })
        }

        // 上传成功后清空input标签
        document.getElementById('pic').value = ''
      })
    }
  }
}

</script>

<style lang='scss' scoped>
#pic {
  display: none;
}
</style>
