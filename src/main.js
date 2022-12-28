import {createApp} from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import * as VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import './assets/main.css'
import App from './App.vue'
import {
    getAccessToken,
    requestAccessByRefresh,
    getRefreshToken,
    putAccessToken,
    putRefreshToken,
    removeAccessToken,
    removeRefreshToken,
    redirectToAuthPage,
} from './auth-utils'
import {routes} from '@/routes'

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

const axiosInstance = axios.create({
    // это нужно поменять для прода, обратите внимание
    baseURL: 'http://127.0.0.1:8000/',
})

axiosInstance.interceptors.request.use(config => {
        const token = getAccessToken()
        if (token !== null) {
            config.headers['Authorization'] = `Bearer ${token}`
        } else {
            if (config.headers['Authorization']) {
                delete config.headers['Authorization']
            }
        }
        return config;
    },
    error => Promise.reject(error))

axiosInstance.interceptors.response.use(response => response, async error => {
    if (error.response?.status === 401) {
        console.log('401 Unauthorized');
        removeAccessToken()
        const refreshToken = getRefreshToken()
        if (refreshToken) {
            try {
                const refreshResult = await requestAccessByRefresh(refreshToken, axiosInstance)
                putAccessToken(refreshResult['access'])
                putRefreshToken(refreshResult['refresh'])
            } catch (e) {
                removeRefreshToken()
                alert('refresh failed')
            }
        }
        await redirectToAuthPage(router)
        return
    }
    return Promise.reject(error)
})

const app = createApp(App)
app.config.unwrapInjectedRef = true
app
    .use(VueAxios, {axios: axiosInstance})
    .use(router)
    .mount('#app')
