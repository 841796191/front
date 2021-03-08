import { getCode } from '../api/login'
import uuid from 'uuid/v4'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// 把需要重复使用的函数通过mixin混入其他组件
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      code: '',
      svg: ''
    }
  },

  mounted () {
    // 生成标识符与对应验证码一起存储
    let sid = ''
    if (localStorage.getItem('sid')) {
      // 判断浏览器有没有存储标识符,有则获取没有则生成一个标识符
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    console.log(sid)

    this._getCode()
  },

  methods: {
    // 获取验证码
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then((res) => {
        // console.log(res)
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    }
  }
}
