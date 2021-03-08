<template>
  <div class="d-flex" :class="{'flex-center': align === 'center',
  'flex-start': align === 'left',
  'flex-end': align === 'right'}">
    <div class="layui-box layui-laypage layui-laypage-default">
      <a @click.prevent="home()"
      class="layui-laypage-prev"
      v-show="showEnd"
      :class="{'layui-disabled': current === 0}">
        <i class="layui-icon layui-icon-prev" v-if="showType === 'icon'"></i>
        <template v-else>首页</template>
      </a>

      <a @click.prevent="prev()" :class="{'layui-disabled': current === 0}">
        <i class="layui-icon layui-icon-left" v-if="showType === 'icon'"></i>
        <template v-else>上一页</template>
      </a>
      <!-- current + 2 > pages.length 显示... -->
      <!-- current - 2 < 1 显示 ... -->
      <!-- template不会在页面上生成任何dom节点和元素 -->
      <!-- current + 1是因为当前页数以0为起始 -->
      <a v-if="pages.length > 5 && (current + 1 - 2) > 1"
      href="javascript:;" class="layui-disabled"
      >
        ...
      </a>

      <template v-for="(item, index) in pages">
        <!-- key属性只能放在真实元素上 -->
        <a v-if="item >= (current + 1 - 2) && item <= (current + 1 + 2)"
        @click="changeIndex(index)"
        :key="'page' + index"
        :class="[current === index ? 'active' : '', current === index ? theme : '']"
        >
          {{item}}
        </a>
      </template>

      <a v-if="pages.length > 5 && (current + 1 + 2) < pages.length"
      href="javascript:;" class="layui-disabled"
      >
        ...
      </a>

      <a @click.prevent="next()" :class="{'layui-disabled': current === pages.length - 1}">
        <i class="layui-icon layui-icon-right" v-if="showType === 'icon'"></i>
        <template v-else>下一页</template>
      </a>

      <a @click.prevent="end()"
      class="layui-laypage-next"
      v-show="showEnd"
      :class="{'layui-disabled': current === pages.length - 1}">
        <i class="layui-icon layui-icon-next" v-if="showType === 'icon'"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <div class="total" v-if="hasTotal">
      到第<input type="text" class="l-input" @keyup.enter="jumpTo">页 共 {{ totalPages }} 页
    </div>

    <div v-if="hasSelect">
      <div class="layui-unselect layui-form-select"
      :class="{'layui-form-selected': isSelect}"
      @click="changeFav()"
      >
        <div class="layui-select-title">
          <input v-model="options[optIndex]"
          type="text"
          placeholder="请选择"
          readonly
          class="layui-input layui-unselect">
          <i class="layui-edge"></i>
        </div>

        <dl class="layui-anim layui-anim-upbit">
          <dd v-for="(item, index) in options"
          :key="'fav' + index"
          @click="chooseFav(item, index)"
          :class="{'layui-this': index === optIndex}"
          >
            {{ item }}
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'page',
  props: {
    align: {
      type: String,
      default: 'center'
    },
    showType: { // 使用icon显示
      type: String,
      default: 'text'
    },
    showEnd: { // 显示首页尾页
      type: Boolean,
      default: false
    },
    theme: { // 高亮主题色
      type: String,
      default: 'layui-bg-blue'
    },
    hasTotal: { // 跳页
      type: Boolean,
      default: false
    },
    hasSelect: { // 选择框显示
      type: Boolean,
      default: false
    },
    total: { // 总页数
      type: Number,
      default: 0
    },
    current: { // 当前页数
      type: Number,
      default: 0
    },
    size: { // 每页条数
      type: Number,
      default: 10
    }
  },

  data () {
    return {
      optIndex: 0,
      options: [10, 20, 30, 50, 100],
      isSelect: false,
      pages: [], // 页数数组
      limit: 10
    }
  },

  watch: { // 当total改变时重新初始化分页器,不然当total改变时会有错误
    total (newval, oldval) {
      this.initPages()
    }
  },

  computed: {
    totalPages () {
      return Math.ceil(this.total / this.limit)
    }
  },

  mounted () {
    // 初始化分页长度
    // 设置select内容
    this.limit = this.size
    this.initPages()
    // 将父组件传递的每页限制条数合并进options后排序再去重生产新的选择数组
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
    this.optIndex = this.options.indexOf(this.size)
  },

  methods: {
    initPages () {
      const len = Math.ceil(this.total / this.limit)
      this.pages = _.range(1, len + 1) // 生成一个1到len的数组
    },

    chooseFav (item, index) {
      if (this.optIndex !== index) {
        // 当页面上limit发送变化后调整current数值
        // limit * current是原先显示条数,除以新限制条数等于新页数
        this.$emit('changeCurrent', Math.floor(this.limit * this.current / this.options[index]))
        // 每页限制条数改变时通知父组件修改
        this.$emit('changeLimit', this.options[index])
      }
      this.optIndex = index
      this.limit = this.options[this.optIndex]
      // 每页限制条数改变后重新初始化页数数组
      this.initPages()
    },
    changeFav () {
      this.isSelect = !this.isSelect
    },

    changeIndex (val) {
      // 连续点击同一页时无效
      if (val !== this.current) {
        this.$emit('changeCurrent', val)
      }
    },

    // 上一页
    prev () {
      let cur = 0
      if (this.current - 1 < 0) {
        cur = 0
      } else {
        cur = this.current - 1
      }
      this.$emit('changeCurrent', cur)
    },
    // 下一页
    next () {
      let cur = 0
      if (this.current + 1 > this.pages.length) {
        cur = this.pages.length - 1
      } else {
        cur = this.current + 1
      }
      this.$emit('changeCurrent', cur)
    },
    // 首页
    home () {
      this.$emit('changeCurrent', 0)
    },
    // 尾页
    end () {
      this.$emit('changeCurrent', this.pages.length - 1)
    },

    // 跳页
    jumpTo (event) {
      const result = event.target.value
      let cur = this.current
      if (result > this.total || result < 0) {
        this.$pop('shake', '请输入正确的页码')
      } else {
        cur = result - 1
      }
      if (cur !== this.current) {
        this.$emit('changeCurrent', cur)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.layui-laypage {
  a {
    margin-left: -1px;
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
  }
  .layui-bg-blue {
    border-color: #1E9FFF;
  }
}
.total {
  color: rgba(51, 51, 51, 1);
  margin-left: 20px;
  position: relative;
  top: -2px;
}
.l-input {
  width: 30px;
  padding: 0 5px;
  height: 25px;
  line-height: 25px;
}
.layui-input {
  height: 30px;
  line-height: 28px;
}
.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
</style>
