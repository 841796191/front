<template>
    <transition name="fade">
      <div v-show="isShow" class="layui-layer-tips layui-edit-face edit-content">
        <div class="layui-layer-content">
          <ul class="layui-clear">
            <li v-for="(value, key) in lists" :key="key"
            @click="handleFaceClick(key)">
              <img :src="value" alt="">
            </li>
          </ul>
        </div>
      </div>
    </transition>
</template>

<script>
// face是一个对象,里面存储了网上的表情请求地址
import faces from '../../../assets/js/face'

export default {
  name: 'Face',
  props: ['isShow'],
  data () {
    return {
      lists: faces
    }
  },

  methods: {
    // 点击表情时把表情的key传过去
    handleFaceClick (item) {
      console.log('faceclick')
      this.$emit('addEvent', item)
      this.$emit('closeEvent')
    }

    // handleBodyClick (e) {
    //   console.log('bodyclick')
    //   e.stopPropagation() // 阻止事件冒泡
    //   if (typeof this.ctrl === 'undefined') return
    //   // 触发隐藏本组件的关闭事件,改变isSHow状态
    //   // 判断是否点击到了非控制icon(表情)以外的地方

    //   // 当点击表情让表情组件显示时不触发handleBodyClick
    //   if (!this.ctrl.contains(e.target)) {
    //     this.$emit('closeEvent')
    //   }
    // }
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
</style>
