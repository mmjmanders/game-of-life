import { createApp } from 'vue'
import '@fontsource-variable/inter'
import '@fontsource-variable/playfair-display'
import './main.css'
import App from './App.vue'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).mount('#app')
