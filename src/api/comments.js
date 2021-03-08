import axios from '../utils/request'
import qs from 'qs'
import store from '../store/index'

// 获取评论列表
const getComments = (params) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    // 判断有无登录,有就带上token
    headers = {
      /* eslint-disable */
      headers: {
        'Authorization': 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/comments?' + qs.stringify(params), headers) 
}

// 添加评论
const addComment = (data) => axios.post('/comments/reply', { ...data })

// 更新评论
const updateComment = (data) => axios.post('/comments/update', { ...data })

// 采纳
const setCommentBest = (params) => axios.get('/comments/accept?' + qs.stringify(params) )

// 点赞
const setHands = (params) => axios.get('/comments/hands?' + qs.stringify(params))
export {
  getComments,
  addComment,
  updateComment,
  setCommentBest,
  setHands
}