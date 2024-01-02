import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import store from './store'
import { setupStore } from './store'
// import './service/axios_demo'
// import hyRequest from './service'
import { globalRegister } from './global'

import './mock/index'
const app = createApp(App)
//全局注册
//use可以传入两种参数，直接传入函数，会自动调用；传入一个对象，会调用install方法
app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET'
// })
