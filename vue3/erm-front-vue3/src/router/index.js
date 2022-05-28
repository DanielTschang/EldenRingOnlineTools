import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import InfoView from '../views/InfoView'
import LogIn from '@/components/auth/LogIn'

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
  {
    path: '/info',
    name: 'info',
    component: InfoView,
    meta:{
      title:"EldenRing Map - Info"
    }
  },
  {
    path: '/AR',
    name: 'ARcalculator',
    component: InfoView,
    meta:{
      title:"EldenRing Map - AR calculator"
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn,
    meta:{
      title:"EldenRing Map - Log in"
    }
  },
  {
    path: '/account',
    name: 'account',
    component: InfoView,
    meta:{
      title:"EldenRing Map - Account"
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
