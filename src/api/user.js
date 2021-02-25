import axios from '../utils/request'
import store from '../store/index'

// 用户签到
const userSign = () => {
  const headers = {
    Authorization: 'Bearer ' + store.state.token
  }
  axios.get('/user/fav', {
    headers
  })
}

export {
  userSign
}
