import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router'
import AppLayout from '@/layouts/AppLayout'
import store from './store/beer.store';

createApp(App)
.use(router)
.use(store)
.component('AppLayout', AppLayout)
.mount('#app')

import 'bootstrap/dist/js/bootstrap.js';