import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.provide('currentUser', { name: 'eason' })
app.mount('#app')