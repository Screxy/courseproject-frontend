import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:8000',
})
const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
