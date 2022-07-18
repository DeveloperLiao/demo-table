import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
//导入axios
import axios from 'axios'
//导入bootstrap
import '../src/assets/css/bootstrap.min.css'
const app = createApp(App)
//配置axios的默认访问地址
axios.defaults.baseURL = 'https://applet-base-api-t.itheima.net/'
//全局配置axios
app.config.globalProperties.$http = axios
app.mount('#app')
