import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title:"EldenRing Map"
    }
  },
  {
    path: '/map',
    name: 'map',
    component: MapView,
    meta:{
      title:"EldenRing Map - Map"
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  document.title = `${to.meta.title}`;
  next();
})

export default router
