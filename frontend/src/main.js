import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. 引入 Pinia
import './style.css'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)
const pinia = createPinia() // 2. 创建 Pinia 实例

app.use(router)
app.use(pinia) // 3. 挂载到 Vue 应用
app.mount('#app')