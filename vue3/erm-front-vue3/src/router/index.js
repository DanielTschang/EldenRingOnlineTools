import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import InfoView from '../views/InfoView'
import LogIn from '@/components/auth/LogIn'
import EmptyView from '../views/EmptyView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: EmptyView,
    meta:{
      keepAlive: true, 
      title:"EldenRing Online Tools"
    }
  },
  {
    path: '/map',
    name: 'map',
    component: MapView,
    meta:{
      keepAlive: true, 
      title:"EldenRing Online Tools - Map"
    }
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView,
    meta:{
      keepAlive: true, 
      title:"EldenRing Online Tools - Info"
    }
  },
  {
    path: '/ARcalculator',
    name: 'ARcalculator',
    component: InfoView,
    meta:{
      keepAlive: true, 
      title:"EldenRing Online Tools - AR calculator"
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn,
    meta:{
      keepAlive: true, 
      title:"EldenRing Online Tools - Log in"
    }
  },
  {
    path: '/account',
    name: 'account',
    component: InfoView,
    meta:{
      keepAlive: true, 
      title:"EldenRing Online Tools - Account"
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
