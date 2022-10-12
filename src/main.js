import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import getVant from '@/plugins'
import PlayBar from '@/components/Global/PlayBar.vue'


const app = createApp(App)
getVant(app)

//公共组件
//底部播放条
app.component('PlayBar',PlayBar)

//数据状态管理
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
