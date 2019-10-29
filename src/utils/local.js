const KEY = 'hm-toutiao-pc-85-user-key'
// 处理用户信息
export default {
  setUser (user) {
    const josnUser = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, josnUser)
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY))
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
