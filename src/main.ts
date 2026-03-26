import { createApp } from 'vue'
import '@fontsource-variable/inter'
import '@fontsource-variable/playfair-display'
import '@fontsource-variable/jetbrains-mono'
import './main.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faForwardStep, faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faPlay, faStop, faForwardStep, faGithub)

createApp(App).use(createPinia()).mount('#app')
