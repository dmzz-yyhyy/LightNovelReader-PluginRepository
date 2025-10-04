import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Varlet from '@varlet/ui'
import App from './App.vue'
import '@varlet/ui/es/style'

const app = createApp(App)

app.use(createPinia())
app.use(Varlet)

app.mount('#app')
