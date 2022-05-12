import Vue from 'vue'
import App from './App.vue'

import 'leaflet/dist/leaflet.css';

import '../node_modules/leaflet/dist/leaflet'
import "./utils/leaflet.canvas-markers.js"
import '../scss/main.scss'

import VueRouter from 'vue-router'

// import MarkerListContainer from "./components/MarkerListContainer"
import HomePage from "./components/HomePage.vue"

const Foo = { template: '<h1>foo</h1>' }
const Bar = { template: '<div>bar</div>' }

const User = { template: '<div>foo</div>' }

Vue.use(VueRouter)

const routes = [
    {path:"/",component:User},
    {path:"/test",component:HomePage},
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
    // {path:"/login", component:LoginComponent},
    // {path:"/register", component:RegisterCompoent},
]

const router = new VueRouter({
    routes:routes
})

//Filters


Vue.config.productionTip = false

new Vue({
    render:h=>h(App),
    router,
}).$mount('#app')



