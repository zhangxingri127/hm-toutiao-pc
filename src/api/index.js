import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'

import JSONBIG from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 利用 JSONBIG 解决js最大数计算有误差问题  axios自身的方法
axios.defaults.transformResponse = [(data) => {
  // 后台的原始数据   理想情况 json字符串
  // 后台可能没有任何响应内容  data 值是 null
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]

// 请求拦截器 给头部添加token请求头
axios.interceptors.request.use(config => {
  // 1. 获取token  携带空字符串'' 会报错
  const user = local.getUser() || {}
  // 2. 头部设置token 注意:Bearer后有一个空格字符
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器   检测token的有效性
axios.interceptors.response.use(res => res, err => {
  // 请求失败
  if (err.response.status === 401) {
    // 跳转登录页面  http://localhost:8080/#/login
    // window.location.href = 'http://localhost:8080/#/login'
    // window.location.hash = '#/login'
    // 建议使用 vue-router 来跳转 , push是router实例的函数
    return router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
