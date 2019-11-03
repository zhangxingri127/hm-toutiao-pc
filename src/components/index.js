// 封装一个插件  注册所有的全局组件
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
