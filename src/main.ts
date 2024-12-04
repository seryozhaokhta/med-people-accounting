import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './index.css'
import { useDoctorsStore } from './stores/doctors'
import { useNursesStore } from './stores/nurses'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')

const doctorsStore = useDoctorsStore()
const nursesStore = useNursesStore()

doctorsStore.loadFromLocalStorage()
nursesStore.loadFromLocalStorage()
