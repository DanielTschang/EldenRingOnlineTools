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

library.add(fas,fab)
/* add icons to the library */

/* add font awesome icon component */

createApp(App)
    .component("fa",FontAwesomeIcon)
    .use(router)
    .mount('#app')
