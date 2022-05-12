import Vue from 'vue'
import App from './App.vue'

import 'leaflet/dist/leaflet.css';

import '../node_modules/leaflet/dist/leaflet'
import "./utils/leaflet.canvas-markers.js"
import '../scss/main.scss'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import '../scss/main.scss'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import VueRouter from 'vue-router'

import MarkerListContainer from "./components/MarkerListContainer"
// import HomePage from "./components/HomePage.vue"
import LogoutPage from "./components/auth/LogOutPage.vue";
import LoginPage from "./components/auth/LogInPage.vue";
import RegisterPage from "./components/auth/RegisterPage.vue";
import ForgotPasswordPage from './components/auth/forgotPassword.vue';


Vue.use(VueRouter)

const routes = [
    {
      path: "/logout",
      component: LogoutPage,
    },
    {
      path: "/forgot-password",
      component: ForgotPasswordPage,
    },
    {
      path: "/login",
      component: LoginPage,
    },
    {
      path: "/register",
      component: RegisterPage,
    },
    {
        path:"/map",
        component: MarkerListContainer
    }

  ];

const router = new VueRouter({
    routes:routes
})

//Filters


Vue.config.productionTip = false

new Vue({
    render:h=>h(App),
    router,
}).$mount('#app')



