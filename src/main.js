import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import 'babel-polyfill'

import '@/styles/index.scss' // global css

import axios from 'axios'
Vue.prototype.axios = axios
axios.defaults.withCredentials=true;

import http from './api/http.js'  // axios实例化后引入取名http
Vue.prototype.http = http  // 放入全局

import btn from './utils/btn.js' // 按钮权限
Vue.prototype.btn = btn  // 放入全局

import App from './App'
import store from './store'
import router from './router'

import '@/styles/style.scss'
/* import http from './api/http'//axios实例化后引入取名http
Vue.prototype.http = http;  //放入全局*/

import '@/icons' // icon
import '@/permission' // permission control

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
import '../mock' // simulation data

Vue.use(ElementUI, { locale })// 设置语言

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
