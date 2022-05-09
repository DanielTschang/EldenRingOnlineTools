import Vue from 'vue'
import App from './App.vue'

import 'leaflet/dist/leaflet.css';

import '../node_modules/leaflet/dist/leaflet'
import "./utils/leaflet.canvas-markers.js"
import '../scss/main.scss'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')



