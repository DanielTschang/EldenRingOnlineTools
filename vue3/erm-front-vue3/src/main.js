import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons"



/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons';
/* import pinia store */
import pinia from './store'


library.add(fas,fab)
/* add icons to the library */



createApp(App)
    .component("fa",FontAwesomeIcon)
    .use(router)
    .use(pinia)
    .mount('#app')
