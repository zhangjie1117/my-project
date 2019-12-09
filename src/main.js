import Vue from 'vue'
import App from './App'
import request from '@/utils/request'
const plugin = request(Vue, {
  baseurl: 'https://www.uinav.com'
})
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(plugin)
const app = new Vue({
  ...App
})
app.$mount()