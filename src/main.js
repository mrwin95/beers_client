import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router'
import AppLayout from '@/layouts/AppLayout'
createApp(App)
.use(router)
.component('AppLayout', AppLayout)
.mount('#app')

import 'bootstrap/dist/js/bootstrap.js';