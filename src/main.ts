import { createApp } from 'vue'
import '@fontsource-variable/inter'
import '@fontsource-variable/playfair-display'
import './main.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faForwardStep, faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

library.add(faPlay, faStop, faForwardStep)

createApp(App).use(createPinia()).mount('#app')
