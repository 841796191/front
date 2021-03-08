<template>
    <transition name="fade">
      <div v-show="isShow" class="layui-layer-page layui-layer-prompt edit-content">
        <div class="layui-layer-title">请贴入代码或任意文本</div>
        <div class="layui-layer-content">
          <textarea class="layui-layer-input"
          v-model="code"
          id="codeInput"
          v-on:keydown.enter="$event.stopPropagation()"
          :style="{'width': this.width + 'px', 'height': this.height + 'px'}"
          >
          </textarea>
        </div>
        <span class="layui-layer-setwin" @click="cancel()">
          <a href="javascript:;" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
        </span>
        <div class="layui-layer-btn layui-layer-btn-">
          <a class="layui-layer-btn0" @click.prevent="submit()">确定</a>
          <a class="layui-layer-btn1" @click.prevent="cancel()">取消</a>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'codeinput',
  props: ['isShow', 'width', 'height'],
  data () {
    return {
      code: ''
    }
  },

  methods: {
    submit () {
      if (this.code === '') {
        document.getElementById('codeInput').focus()
        this.$pop('shake', '请输入引用内容')
        return
      }
      this.$emit('addEvent', this.code)
      setTimeout(() => {
        this.code = ''
        this.$emit('closeEvent')
      }, 0)
    },

    cancel () {
      this.code = ''
      this.$emit('closeEvent')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
